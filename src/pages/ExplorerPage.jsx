import React, { useState, useMemo } from 'react';
import { useDataset } from '../context/DatasetContext';
import { FilterBar } from '../components/explorer/FilterBar';
import { DataTable } from '../components/explorer/DataTable';
import { Pagination } from '../components/explorer/Pagination';
import { RecordDetailModal } from '../components/explorer/RecordDetailModal';
import { EmptyState } from '../components/common/EmptyState';

export const ExplorerPage = ({ onOpenUploader }) => {
  const {
    rawData,
    filteredData,
    filters,
    updateFilter,
    resetFilters
  } = useDataset();

  // Sorting state
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selected record for details modal
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sorted data
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    data.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [filteredData, sortField, sortDirection]);

  // Paginated chunk
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Reset page when filters change
  const handleUpdateFilter = (key, val) => {
    updateFilter(key, val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Crop Disease Dataset Explorer
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive multi-criteria search, sorting, and diagnostic record inspection
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        filters={filters}
        onUpdateFilter={handleUpdateFilter}
        onResetFilters={resetFilters}
        totalCount={rawData.length}
        filteredCount={filteredData.length}
        currentFilteredData={filteredData}
      />

      {/* Main Table or Empty State */}
      {sortedData.length > 0 ? (
        <div className="space-y-4">
          <DataTable
            data={paginatedData}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={sortedData.length}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      ) : (
        <EmptyState
          title="No matching crop records found"
          description="No samples match your current filter combination. Try clearing some filters or searching for another term."
          actionText="Reset All Filters"
          onAction={resetFilters}
        />
      )}

      {/* Record Inspection Modal */}
      <RecordDetailModal
        record={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};
