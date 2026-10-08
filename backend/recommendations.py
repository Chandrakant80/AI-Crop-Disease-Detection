"""
Comprehensive domain knowledge base for crop diseases.
Provides botanical classification, symptoms, treatments, and prevention guidelines.
"""

DISEASE_RECOMMENDATIONS = {
    # ---------------- Supported plant identification / out-of-scope disease scans ----------------
    "Snake_Plant_Identification": {
        "crop": "Snake Plant",
        "disease": "Disease detection unavailable",
        "scientific_name": "Dracaena trifasciata (formerly Sansevieria trifasciata)",
        "pathogen_type": "Not assessed",
        "status": "Identified",
        "severity": "N/A",
        "symptoms": (
            "The plant has upright sword-shaped leaves, horizontal green banding, and yellow margins, "
            "which are characteristic of a snake plant. It is not a supported crop."
        ),
        "treatment": "N/A - This is an unsupported plant. No agricultural medicine or treatment is provided.",
        "prevention": "N/A - Not a supported crop."
    },

    # ---------------- Tomato Diseases ----------------
    "Tomato_Early_Blight": {
        "crop": "Tomato",
        "disease": "Early Blight",
        "scientific_name": "Alternaria solani",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "Moderate",
        "symptoms": (
            "Small, dark brown to black spots with characteristic concentric rings (target-board pattern) "
            "appearing primarily on older, lower foliage. Yellow chlorotic halos develop around spots, "
            "eventually leading to leaf yellowing, drying, and premature defoliation."
        ),
        "treatment": (
            "1. Spray copper-based fungicides (Copper Hydroxide) or Mancozeb at early onset.\n"
            "2. Apply bio-fungicides containing Bacillus subtilis or Trichoderma viride.\n"
            "3. Prune and safely incinerate heavily infected lower branches.\n"
            "4. Avoid overhead sprinkler irrigation to reduce foliage moisture."
        ),
        "prevention": (
            "1. Practice 3-year crop rotation with non-solanaceous crops.\n"
            "2. Use organic straw or plastic mulch around the plant base to prevent soil splash.\n"
            "3. Maintain adequate plant spacing (45-60 cm) to ensure good air circulation.\n"
            "4. Choose resistant or tolerant tomato varieties."
        )
    },
    "Tomato_Late_Blight": {
        "crop": "Tomato",
        "disease": "Late Blight",
        "scientific_name": "Phytophthora infestans",
        "pathogen_type": "Oomycete",
        "status": "Infected",
        "severity": "Critical",
        "symptoms": (
            "Rapidly spreading irregular, water-soaked dark brown to purplish lesions on leaves and stems. "
            "In humid or cool conditions, a delicate white downy fungal growth appears on the undersides of leaves. "
            "Fruits develop large, greasy brown lesions."
        ),
        "treatment": (
            "1. Immediately remove and burn severely infected plants to halt field contagion.\n"
            "2. Apply systemic fungicides such as Metalaxyl, Dimethomorph, or Chlorothalonil.\n"
            "3. Treat surrounding uninfected plants with protectant copper fungicides."
        ),
        "prevention": (
            "1. Plant certified disease-free seedlings and resistant cultivars (e.g., Mountain Magic, Defiant).\n"
            "2. Destroy volunteer tomato plants and potato cull piles near fields.\n"
            "3. Avoid wetting foliage during irrigation, especially late in the day."
        )
    },
    "Tomato_Bacterial_Spot": {
        "crop": "Tomato",
        "disease": "Bacterial Spot",
        "scientific_name": "Xanthomonas perforans",
        "pathogen_type": "Bacterium",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "Small, circular to angular water-soaked dark spots that turn black with a greasy sheen. "
            "Centres may dry up and tear away (shot-hole look). Green fruits exhibit raised, scabby dark blisters."
        ),
        "treatment": (
            "1. Apply copper bactericides mixed with Mancozeb to overcome copper resistance.\n"
            "2. Utilize bacteriophage-based biocontrol sprays (AgriPhage).\n"
            "3. Disinfect stakes, pruning shears, and harvesting tools between rows."
        ),
        "prevention": (
            "1. Treat seeds with hot water (50°C for 25 minutes) before planting.\n"
            "2. Avoid overhead sprinkler irrigation and working in wet fields.\n"
            "3. Incorporate crop residues promptly after harvest to accelerate decomposition."
        )
    },
    "Tomato_Yellow_Leaf_Curl": {
        "crop": "Tomato",
        "disease": "Yellow Leaf Curl Virus",
        "scientific_name": "Begomovirus TYLCV",
        "pathogen_type": "Virus (Vector: Whitefly)",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "Severe upward curling and cupping of leaflets, marked yellowing (chlorosis) along margins, "
            "stunted bushy plant growth, and heavy blossom drop leading to drastically reduced fruit set."
        ),
        "treatment": (
            "1. No curative chemical treatment exists for viral plant infections.\n"
            "2. Rogue and destroy infected plants immediately to reduce virus inoculum.\n"
            "3. Spray neem oil, insecticidal soap, or imidacloprid to suppress vector whiteflies (Bemisia tabaci)."
        ),
        "prevention": (
            "1. Use 50-mesh insect-proof netting in seedling nurseries and greenhouse vents.\n"
            "2. Deploy yellow sticky traps throughout the canopy.\n"
            "3. Grow virus-resistant tomato hybrids (e.g., Tycoon, Charger)."
        )
    },
    "Tomato_Healthy": {
        "crop": "Tomato",
        "disease": "Healthy Tomato",
        "scientific_name": "Solanum lycopersicum",
        "pathogen_type": "None",
        "status": "Healthy",
        "severity": "None",
        "symptoms": (
            "Vigorous foliage with rich, uniform green color. Smooth leaf surfaces with intact venation, "
            "no spots, necrotic margins, curling, or fungal growth."
        ),
        "treatment": (
            "1. No chemical or therapeutic treatment required.\n"
            "2. Maintain balanced N-P-K fertilization and consistent soil moisture.\n"
            "3. Continue routine weekly monitoring for early pest or disease signs."
        ),
        "prevention": (
            "1. Maintain proper plant spacing and staking for canopy ventilation.\n"
            "2. Implement drip irrigation at the root zone.\n"
            "3. Apply organic compost and mulch regularly."
        )
    },

    # ---------------- Potato Diseases ----------------
    "Potato_Early_Blight": {
        "crop": "Potato",
        "disease": "Early Blight",
        "scientific_name": "Alternaria solani",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "Moderate",
        "symptoms": (
            "Dark brown, papery target-like spots with concentric rings on mature leaves. "
            "Older leaves turn chlorotic, senesce early, and reduce overall tuber bulking."
        ),
        "treatment": (
            "1. Apply protectant fungicides such as Chlorothalonil or Azoxystrobin before canopy closure.\n"
            "2. Prune heavily infested foliage where practical."
        ),
        "prevention": (
            "1. Maintain balanced soil fertility, avoiding nitrogen deficiency during tuber bulking.\n"
            "2. Practice 3 to 4-year crop rotations away from nightshade crops."
        )
    },
    "Potato_Late_Blight": {
        "crop": "Potato",
        "disease": "Late Blight",
        "scientific_name": "Phytophthora infestans",
        "pathogen_type": "Oomycete",
        "status": "Infected",
        "severity": "Critical",
        "symptoms": (
            "Water-soaked dark green to black blotches starting at leaf tips and margins. "
            "In moist conditions, white mildew appears beneath leaves. Can destroy entire fields in days and rot tubers."
        ),
        "treatment": (
            "1. Apply systemic fungicides: Metalaxyl, Cymoxanil, or Mandipropamid immediately.\n"
            "2. Remove and dispose of infected plants away from agricultural areas."
        ),
        "prevention": (
            "1. Plant certified disease-free seed tubers.\n"
            "2. Hill up potatoes thoroughly to create a deep soil buffer protecting tubers from spore wash.\n"
            "3. Destroy all volunteer potato sprouts and cull piles in early spring."
        )
    },
    "Potato_Healthy": {
        "crop": "Potato",
        "disease": "Healthy Potato",
        "scientific_name": "Solanum tuberosum",
        "pathogen_type": "None",
        "status": "Healthy",
        "severity": "None",
        "symptoms": "Uniform deep green leaves, robust stems, no foliar lesions or wilting signs.",
        "treatment": "Maintain standard agronomic care, balanced hilling, and irrigation.",
        "prevention": "Inspect fields weekly and ensure proper soil drainage."
    },

    # ---------------- Corn (Maize) Diseases ----------------
    "Corn_Common_Rust": {
        "crop": "Corn (Maize)",
        "disease": "Common Rust",
        "scientific_name": "Puccinia sorghi",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "Moderate",
        "symptoms": (
            "Golden-brown to cinnamon-colored powdery pustules (uredinia) scattered across upper and lower leaf surfaces. "
            "Pustules rupture the epidermis, releasing powdery rust spores; foliage becomes chlorotic and dry."
        ),
        "treatment": (
            "1. Apply triazole or strobilurin fungicides (e.g., Pyraclostrobin, Propiconazole) if pustules appear prior to tasseling.\n"
            "2. Ensure adequate potassium levels in soil."
        ),
        "prevention": (
            "1. Plant resistant hybrid corn varieties.\n"
            "2. Early planting to avoid peak airborne spore waves in mid-summer."
        )
    },
    "Corn_Northern_Leaf_Blight": {
        "crop": "Corn (Maize)",
        "disease": "Northern Leaf Blight",
        "scientific_name": "Exserohilum turcicum",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "Long, elliptical, grayish-green or tan lesions (cigar-shaped, 2.5 to 15 cm long) "
            "developing parallel to leaf margins. Spots merge, causing widespread foliar blight."
        ),
        "treatment": (
            "1. Apply fungicides such as Azoxystrobin + Difenoconazole at first appearance.\n"
            "2. Shred and deeply plow under infected crop debris post-harvest."
        ),
        "prevention": (
            "1. Select high-yielding resistant corn hybrids (containing Ht resistance genes).\n"
            "2. Rotate fields with non-host crops such as soybeans or alfalfa."
        )
    },
    "Corn_Healthy": {
        "crop": "Corn (Maize)",
        "disease": "Healthy Corn",
        "scientific_name": "Zea mays",
        "pathogen_type": "None",
        "status": "Healthy",
        "severity": "None",
        "symptoms": "Broad, vibrant green leaves with clean parallel venation and no lesions or rust pustules.",
        "treatment": "Maintain balanced nitrogen side-dressing and timely irrigation during silking.",
        "prevention": "Continue standard weed management and crop scouting."
    },

    # ---------------- Apple Diseases ----------------
    "Apple_Scab": {
        "crop": "Apple",
        "disease": "Apple Scab",
        "scientific_name": "Venturia inaequalis",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "Olive-green to velvety brown velvety spots on upper leaf surfaces. Spots become corky, "
            "deforming leaves and causing early leaf drop. Dark scabby lesions also mar fruit skin."
        ),
        "treatment": (
            "1. Spray Captan or Mancozeb during pink bud through petal fall.\n"
            "2. Rake and compost or shred fallen autumn leaves to eliminate overwintering ascospores."
        ),
        "prevention": (
            "1. Plant scab-resistant apple cultivars (e.g., Enterprise, Liberty, GoldRush).\n"
            "2. Prune tree canopies annually for sunlight penetration and rapid drying."
        )
    },
    "Apple_Black_Rot": {
        "crop": "Apple",
        "disease": "Black Rot",
        "scientific_name": "Botryosphaeria obtusa",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "'Frog-eye' leaf spots: small purple spots expanding into circular lesions with light brown centres "
            "and dark purple borders. Black sunken cankers on twigs and firm black fruit rot."
        ),
        "treatment": (
            "1. Prune out dead twigs, fire blight cankers, and mummified fruits from branches.\n"
            "2. Apply Thiophanate-methyl or Captan from petal fall through summer."
        ),
        "prevention": (
            "1. Sanitize all pruning tools.\n"
            "2. Minimize insect damage and mechanical bark wounds."
        )
    },
    "Apple_Healthy": {
        "crop": "Apple",
        "disease": "Healthy Apple",
        "scientific_name": "Malus domestica",
        "pathogen_type": "None",
        "status": "Healthy",
        "severity": "None",
        "symptoms": "Serrate green leaves, sturdy foliage without discoloration, blemishes, or fungal spots.",
        "treatment": "Maintain balanced orchard nutrition and regular pest management.",
        "prevention": "Ensure annual winter pruning for optimal canopy aeration."
    },

    # ---------------- Grape Diseases ----------------
    "Grape_Black_Rot": {
        "crop": "Grape",
        "disease": "Black Rot",
        "scientific_name": "Guignardia bidwellii",
        "pathogen_type": "Fungus",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "Small reddish-brown circular spots on leaves with tiny black speck fruiting bodies (pycnidia) "
            "arranged in rings. Infected berries shrivel into hard, black, wrinkled mummies."
        ),
        "treatment": (
            "1. Apply myclobutanil or mancozeb at early bud break through veraison.\n"
            "2. Remove and dispose of mummified grape clusters during winter pruning."
        ),
        "prevention": (
            "1. Open up vine canopy through leaf pulling to promote fast drying.\n"
            "2. Avoid excessive nitrogen fertilizers that stimulate overly dense foliage."
        )
    },
    "Grape_Healthy": {
        "crop": "Grape",
        "disease": "Healthy Grape",
        "scientific_name": "Vitis vinifera",
        "pathogen_type": "None",
        "status": "Healthy",
        "severity": "None",
        "symptoms": "Lobed, glossy green leaves with clear veins and no necrotic spots, mildew, or mummies.",
        "treatment": "Standard vineyard maintenance and canopy management.",
        "prevention": "Continue trellising and periodic scouting."
    },

    # ---------------- Bell Pepper Diseases ----------------
    "Pepper_Bacterial_Spot": {
        "crop": "Bell Pepper",
        "disease": "Bacterial Spot",
        "scientific_name": "Xanthomonas campestris",
        "pathogen_type": "Bacterium",
        "status": "Infected",
        "severity": "High",
        "symptoms": (
            "Small, yellowish-green blister-like spots on leaves that enlarge and turn dark brown. "
            "Spots cause heavy leaf shedding, leaving fruits vulnerable to severe sunscald."
        ),
        "treatment": (
            "1. Spray fixed copper combined with Mancozeb.\n"
            "2. Treat with biological products containing Bacillus amyloliquefaciens."
        ),
        "prevention": (
            "1. Use certified disease-free seeds and transplants.\n"
            "2. Practice 2 to 3-year crop rotations with non-solanaceous crops."
        )
    },
    "Pepper_Healthy": {
        "crop": "Bell Pepper",
        "disease": "Healthy Bell Pepper",
        "scientific_name": "Capsicum annuum",
        "pathogen_type": "None",
        "status": "Healthy",
        "severity": "None",
        "symptoms": "Smooth, dark green foliage with upright vigorous growth and clean margins.",
        "treatment": "Routine moisture management and balanced fertilizing.",
        "prevention": "Use clean drip irrigation and weed barriers."
    }
}


def normalize_key(key: str) -> str:
    """Normalizes a disease name or key into standard lookup format."""
    clean = key.strip().replace(" ", "_").replace("-", "_").replace("___", "_")
    return clean


def get_recommendation(disease_name_or_key: str):
    """
    Retrieves full recommendation details for a given disease name or key.
    Falls back gracefully if not found.
    """
    if not disease_name_or_key:
        return {
            "crop": "Analysis unavailable",
            "disease": "No disease specified",
            "scientific_name": "N/A",
            "pathogen_type": "None",
            "status": "Unavailable",
            "severity": "N/A",
            "symptoms": "No disease or crop identifier was provided for lookup.",
            "treatment": "No treatments can be prescribed without a recognized disease diagnosis.",
            "prevention": "Consult a trained agronomist or plant pathologist."
        }

    # 1. Exact match
    if disease_name_or_key in DISEASE_RECOMMENDATIONS:
        return DISEASE_RECOMMENDATIONS[disease_name_or_key]

    # 2. Normalized match
    norm = normalize_key(disease_name_or_key)
    for k, v in DISEASE_RECOMMENDATIONS.items():
        if normalize_key(k).lower() == norm.lower():
            return v

    # 3. Fuzzy / partial match
    norm_lower = disease_name_or_key.lower().replace("_", " ")
    for k, v in DISEASE_RECOMMENDATIONS.items():
        label = f"{v['crop']} {v['disease']}".lower()
        if norm_lower in label or label in norm_lower:
            return v

    # 4. Check if healthy
    if "healthy" in norm_lower:
        for k, v in DISEASE_RECOMMENDATIONS.items():
            if "healthy" in k.lower() and (v["crop"].lower() in norm_lower):
                return v

    # Never fall back to Tomato Early Blight or any fake disease
    return {
        "crop": "Unknown specimen",
        "disease": "Diagnosis unavailable",
        "scientific_name": "N/A",
        "pathogen_type": "None",
        "status": "Unavailable",
        "severity": "N/A",
        "symptoms": f"Specimen '{disease_name_or_key}' is not mapped to any supported crop disease class.",
        "treatment": "No treatment recommended without an authenticated diagnosis.",
        "prevention": "Never treat crops based on unverified default classifications."
    }


def get_all_diseases():
    """Returns a list of all supported disease summaries."""
    results = []
    for key, data in DISEASE_RECOMMENDATIONS.items():
        results.append({
            "key": key,
            "crop": data["crop"],
            "disease": data["disease"],
            "scientific_name": data["scientific_name"],
            "pathogen_type": data["pathogen_type"],
            "severity": data["severity"],
            "status": data["status"]
        })
    return results
