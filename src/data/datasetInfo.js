/**
 * Disease metadata, botanical classification, symptoms and treatment repository.
 * Provides rich domain context for the BTech project demo.
 */

export const CROP_CATEGORIES = [
  'Tomato',
  'Potato',
  'Corn (Maize)',
  'Apple',
  'Grape',
  'Bell Pepper',
  'Rice',
  'Wheat'
];

export const SEVERITY_LEVELS = ['None', 'Low', 'Moderate', 'High', 'Critical'];

export const DATASET_SPLITS = ['Train', 'Validation', 'Test'];

export const DISEASE_CATALOG = {
  'Tomato_Early_Blight': {
    crop: 'Tomato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungus',
    severityDefault: 'Moderate',
    symptoms: 'Concentric dark brown to black rings (target-spot pattern) on older foliage, yellow halos surrounding spots, eventual leaf drop.',
    treatment: 'Apply copper-based organic fungicides or Mancozeb. Space plants for airflow, mulch the soil base, and avoid sprinkler irrigation.',
    prevention: 'Practice 3-year crop rotation with non-solanaceous crops, eradicate volunteer nightshade weeds, sanitize pruning tools.',
    riskLevel: 'Moderate'
  },
  'Tomato_Late_Blight': {
    crop: 'Tomato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'Oomycete',
    severityDefault: 'Critical',
    symptoms: 'Rapidly expanding water-soaked greasy lesions, white fuzzy mildew on leaf undersides in humid weather, stem and fruit rot.',
    treatment: 'Promptly remove and incinerate severely infected tissue. Apply Chlorothalonil or potassium phosphite preventative spray immediately.',
    prevention: 'Plant certified disease-free transplants, choose resistant cultivars (e.g., Mountain Magic, Defiant), avoid wet leaves at night.',
    riskLevel: 'Critical'
  },
  'Tomato_Bacterial_Spot': {
    crop: 'Tomato',
    disease: 'Bacterial Spot',
    scientificName: 'Xanthomonas perforans',
    pathogenType: 'Bacterium',
    severityDefault: 'High',
    symptoms: 'Small, water-soaked dark brown spots that turn greasy with chlorotic margins; scabby lesions on green fruits.',
    treatment: 'Copper hydroxide combined with Mancozeb spray; apply bacteriophage biocontrol formulations.',
    prevention: 'Hot-water seed treatment, avoid handling wet plants, maintain balanced non-excessive nitrogen fertilization.',
    riskLevel: 'High'
  },
  'Tomato_Yellow_Leaf_Curl': {
    crop: 'Tomato',
    disease: 'Yellow Leaf Curl Virus',
    scientificName: 'Begomovirus TYLCV',
    pathogenType: 'Virus (Whitefly vector)',
    severityDefault: 'High',
    symptoms: 'Upward curling and severe crumpling of leaf margins, severe stunting of apical growth, flower abortion.',
    treatment: 'No chemical cure once infected. Rogue and destroy infected plants; apply insecticidal soap or neem oil to control whiteflies.',
    prevention: 'Install 50-mesh insect netting in greenhouses, deploy yellow sticky traps, use reflective silver mulches.',
    riskLevel: 'High'
  },
  'Tomato_Healthy': {
    crop: 'Tomato',
    disease: 'Healthy Leaf',
    scientificName: 'Solanum lycopersicum',
    pathogenType: 'None',
    severityDefault: 'None',
    symptoms: 'Lush green foliage with uniform chlorophyll distribution, intact leaf veins, vigorous growth without lesion or discoloration.',
    treatment: 'Maintain routine moisture levels, monitor weekly for early insect vectors, apply balanced 10-10-10 organic fertilizer.',
    prevention: 'Follow standard agro-ecological maintenance, optimal spacing, drip irrigation.',
    riskLevel: 'None'
  },
  'Potato_Late_Blight': {
    crop: 'Potato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'Oomycete',
    severityDefault: 'Critical',
    symptoms: 'Dark necrotic blotches on leaf tips and margins with translucent wet borders; tuber breakdown with dry granular brown rot.',
    treatment: 'Systemic fungicides (e.g., Metalaxyl, Dimethomorph). Eradicate infected cull piles immediately.',
    prevention: 'Plant certified disease-free seed tubers, hill up soil well to shield tubers from spore wash-down.',
    riskLevel: 'Critical'
  },
  'Potato_Early_Blight': {
    crop: 'Potato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungus',
    severityDefault: 'Moderate',
    symptoms: 'Dry, brown papery spots with pronounced concentric rings on lower mature leaves, spreading upward during heat stress.',
    treatment: 'Protectant fungicides such as Chlorothalonil or Azoxystrobin applied prior to canopy closure.',
    prevention: 'Ensure consistent nitrogen and potassium nutrition, avoid sprinkler irrigation late in the evening.',
    riskLevel: 'Moderate'
  },
  'Potato_Healthy': {
    crop: 'Potato',
    disease: 'Healthy Leaf',
    scientificName: 'Solanum tuberosum',
    pathogenType: 'None',
    severityDefault: 'None',
    symptoms: 'Vigorous deep green compound leaves, firm stems, crisp leaf margins, active photosynthesis.',
    treatment: 'Routine drip irrigation and preventative scout checks.',
    prevention: 'Standard integrated crop management.',
    riskLevel: 'None'
  },
  'Corn_Common_Rust': {
    crop: 'Corn (Maize)',
    disease: 'Common Rust',
    scientificName: 'Puccinia sorghi',
    pathogenType: 'Fungus',
    severityDefault: 'Moderate',
    symptoms: 'Golden-brown to cinnamon-colored powdery pustules (uredinia) scattered across both upper and lower leaf surfaces.',
    treatment: 'Foliar strobilurin or triazole fungicides if pustules appear prior to silking on susceptible inbred lines.',
    prevention: 'Select rust-resistant hybrids; rust rarely causes economic damage on modern resistant field corn.',
    riskLevel: 'Moderate'
  },
  'Corn_Northern_Leaf_Blight': {
    crop: 'Corn (Maize)',
    disease: 'Northern Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    pathogenType: 'Fungus',
    severityDefault: 'High',
    symptoms: 'Large, elongated cigar-shaped grayish-green to tan lesions (1 to 6 inches long) parallel to leaf veins.',
    treatment: 'Apply fungicides (Pyraclostrobin + Fluxapyroxad) at VT/R1 stage if lesions advance to upper ear leaves.',
    prevention: 'Deep tillage to bury crop debris, minimum 2-year crop rotation away from continuous maize.',
    riskLevel: 'High'
  },
  'Corn_Healthy': {
    crop: 'Corn (Maize)',
    disease: 'Healthy Leaf',
    scientificName: 'Zea mays',
    pathogenType: 'None',
    severityDefault: 'None',
    symptoms: 'Broad emerald-green leaf blades, crisp longitudinal venation, robust stalk turgidity.',
    treatment: 'Optimal side-dress nitrogen application, regular soil moisture monitoring.',
    prevention: 'Maintain balanced field fertility and weed control.',
    riskLevel: 'None'
  },
  'Apple_Scab': {
    crop: 'Apple',
    disease: 'Apple Scab',
    scientificName: 'Venturia inaequalis',
    pathogenType: 'Fungus',
    severityDefault: 'High',
    symptoms: 'Velvety olive-green to dull brown lesions on leaves; infected fruit becomes scabby, cracked, and deformed.',
    treatment: 'Captan or sulfur sprays from bud break through petal fall; post-infection myclobutanil sprays.',
    prevention: 'Rake and shred fallen apple leaves in autumn, apply urea to hasten leaf decomposition.',
    riskLevel: 'High'
  },
  'Apple_Black_Rot': {
    crop: 'Apple',
    disease: 'Black Rot (Frogeye)',
    scientificName: 'Botryosphaeria obtusa',
    pathogenType: 'Fungus',
    severityDefault: 'Moderate',
    symptoms: 'Small purple specks on leaves expanding into circular "frogeye" spots with tan centers; fruit turns leathery and mummified.',
    treatment: 'Prune out dead wood, fire blight strikes, and mummified fruits. Apply captan or thiophanate-methyl.',
    prevention: 'Maintain good orchard sanitation and prune trees to permit rapid leaf drying.',
    riskLevel: 'Moderate'
  },
  'Apple_Healthy': {
    crop: 'Apple',
    disease: 'Healthy Leaf',
    scientificName: 'Malus domestica',
    pathogenType: 'None',
    severityDefault: 'None',
    symptoms: 'Serrated dark-green foliage, supple texture, zero signs of blotch or powdery sporulation.',
    treatment: 'Regular canopy pruning to maximize sunlight and breeze penetration.',
    prevention: 'Winter dormant oil spray for overwintering pests.',
    riskLevel: 'None'
  },
  'Grape_Black_Rot': {
    crop: 'Grape',
    disease: 'Black Rot',
    scientificName: 'Guignardia bidwellii',
    pathogenType: 'Fungus',
    severityDefault: 'High',
    symptoms: 'Reddish-brown circular spots with small black pycnidia dots; berries shrivel into hard, black, wrinkled raisins.',
    treatment: 'Mancozeb or Ziram early in season; switch to myclobutanil or kresoxim-methyl near bloom.',
    prevention: 'Meticulously remove all mummified grapes from trellis during dormant winter pruning.',
    riskLevel: 'High'
  },
  'Grape_Healthy': {
    crop: 'Grape',
    disease: 'Healthy Leaf',
    scientificName: 'Vitis vinifera',
    pathogenType: 'None',
    severityDefault: 'None',
    symptoms: 'Crisp palmate foliage, vivid venation, healthy tendril development.',
    treatment: 'Canopy management and shoot positioning.',
    prevention: 'Ensure balanced potassium and micronutrient soil availability.',
    riskLevel: 'None'
  },
  'Rice_Blast': {
    crop: 'Rice',
    disease: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    pathogenType: 'Fungus',
    severityDefault: 'Critical',
    symptoms: 'Spindle-shaped diamond lesions with gray-whitish centers and brown-to-red borders on leaf blades and panicle neck.',
    treatment: 'Tricyclazole, Isoprothiolane or Azoxystrobin applications; drain excess pond water if humidity is extreme.',
    prevention: 'Avoid high rates of nitrogen fertilizer; plant resistant varieties like IR64-Sub1.',
    riskLevel: 'Critical'
  },
  'Rice_Healthy': {
    crop: 'Rice',
    disease: 'Healthy Leaf',
    scientificName: 'Oryza sativa',
    pathogenType: 'None',
    severityDefault: 'None',
    symptoms: 'Upright emerald blades, strong tillering, clean culm nodes without blast lesions.',
    treatment: 'Standard regulated paddy flooding and split urea fertilization.',
    prevention: 'Optimal field drainage and certified seed sourcing.',
    riskLevel: 'None'
  }
};
