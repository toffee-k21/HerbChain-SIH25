// Translation keys and their English/Hindi translations
export const translations = {
  en: {
    // App
    'app.title': 'HerbChain Collector',
    'app.welcome': 'Welcome to HerbChain Collector',
    'app.description': 'Secure and transparent herb supply chain management',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.wallet': 'Wallet',
    'nav.kyc': 'KYC Verification',
    'nav.profile': 'Profile',
    'nav.collections': 'Collections',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Common UI
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.view': 'View',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.select': 'Select',
    'common.confirm': 'Confirm',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    
    // Language
    'common.language': 'Language',
    'common.english': 'English',
    'common.hindi': 'हिंदी',
    
    // Forms
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.error': 'Error',
    'form.success': 'Success',
    'form.warning': 'Warning',
    'form.info': 'Info',
    
    // KYC
    'kyc.title': 'KYC Verification',
    'kyc.subtitle': 'Complete your identity verification',
    'kyc.button': 'Start KYC Process',
    'kyc.status.pending': 'Pending',
    'kyc.status.approved': 'Approved',
    'kyc.status.rejected': 'Rejected',
    
    // KYC Form
    'kyc.form.title': 'KYC Registration',
    'kyc.form.fullname': 'Full Name',
    'kyc.form.location': 'Location',
    'kyc.form.email': 'Email',
    'kyc.form.password': 'Password',
    'kyc.form.governmentId': 'Government ID',
    'kyc.form.submit': 'Submit KYC',
    'kyc.form.dragHint': 'Complete your KYC to proceed further',
    'kyc.form.progress.continue': 'Keep dragging...',
    'kyc.form.progress.almost': 'Almost there...',
    'kyc.form.progress.more': 'Just a bit more...',
    'kyc.form.progress.perfect': 'Perfect!',
    
    // KYC Carousel
    'kyc.carousel.collectors.title': 'Wild Collectors',
    'kyc.carousel.collectors.primary': 'Authentic Collection',
    'kyc.carousel.collectors.secondary': 'Collect herbs directly from their natural habitat with verified authenticity',
    
    'kyc.carousel.technicians.title': 'Lab Technicians',
    'kyc.carousel.technicians.primary': 'Quality Testing',
    'kyc.carousel.technicians.secondary': 'Ensure product quality through scientific testing and verification',
    
    'kyc.carousel.stakeholders.title': 'Stakeholders',
    'kyc.carousel.stakeholders.primary': 'Supply Chain Management',
    'kyc.carousel.stakeholders.secondary': 'Manage and oversee the entire herb supply chain process',
    
    'kyc.carousel.consumers.title': 'Consumers',
    'kyc.carousel.consumers.primary': 'Verified Products',
    'kyc.carousel.consumers.secondary': 'Access authentic, tested herbs with complete traceability',
    
    // Wallet
    'wallet.title': 'Wallet',
    'wallet.subtitle': 'Manage your blockchain wallet connection',
    'wallet.balance': 'Balance',
    'wallet.address': 'Address',
    'wallet.connect': 'Connect Wallet',
    'wallet.disconnect': 'Disconnect',
    'wallet.connected': 'Connected',
    'wallet.connection.success': 'Wallet connected successfully!',
    'wallet.connection.failed': 'Wallet connection failed',
    'wallet.connection.trying': 'Connecting...',
    'wallet.browser.detected': 'Browser wallet detected',
    'wallet.mobile.connect': 'Connect via WalletConnect',
    'wallet.status.connected': 'Wallet Status: Connected',
    'wallet.status.disconnected': 'Wallet Status: Disconnected',
    'wallet.continue': 'Continue to Dashboard',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.recent': 'Recent Activity',
    'dashboard.stats': 'Statistics',
    
    // Collections
    'collection.title': 'Record Collection',
    'collection.subtitle': 'Record your herb collection ',
    'collection.create': 'Create Collection',
    'collection.date': 'Collection Date',
    'collection.location': 'Location',
    'collection.herbs': 'Herbs Collected',
    'collection.quantity': 'Quantity',
    'collection.quality': 'Quality',
    'collection.submit': 'Record Collection',
    'collection.success': 'Collection recorded successfully!',
    
    // Collection Form Fields
    'collection.form.timestamp': 'Timestamp',
    'collection.form.collectorId': 'Collector ID',
    'collection.form.location.label': 'Location',
    'collection.form.herbName': 'Herb Name',
    'collection.form.herbName.placeholder': 'Enter herb name',
    'collection.form.quantity.label': 'Quantity (kg)',
    'collection.form.quantity.placeholder': 'Enter quantity',
    'collection.form.image': 'Herb Image',
    'collection.form.image.select': 'Select Image',
    'collection.form.image.change': 'Change Image',
    'collection.form.quality': 'Initial Quality Assessment',
    'collection.form.quality.placeholder': 'Describe the quality, condition, and appearance',
    'collection.form.details': 'Additional Details',
    'collection.form.details.placeholder': 'Any additional information about the collection',
    'collection.form.loading.collectorId': 'Loading...',
    'collection.form.loading.location': 'Getting location...',
    'collection.form.location.denied': 'Location access denied',
    
    // Image Selection Modal
    'image.modal.title': 'Select Image',
    'image.modal.camera': 'Take Photo',
    'image.modal.upload': 'Upload from Gallery',
    
    // Health Analysis
    'health.analyze': 'Analyze Plant Health',
    'health.analyzing': 'Analyzing Health...',
    'health.title': 'Plant Health Analysis Results',
    'health.subtitle': 'AI-powered analysis of your herb\'s health condition',
    'health.identification': 'Plant Identification',
    'health.status': 'Health Status',
    'health.quality': 'Quality Assessment',
    'health.diseases': 'Disease & Pest Analysis',
    'health.recommendations': 'Recommendations',
    'health.error': 'Failed to analyze plant health. Please try again.',
    
    // Status messages
    'status.success': 'Operation completed successfully',
    'status.error': 'An error occurred',
    'status.warning': 'Warning: Please check the information',
    'status.info': 'Information updated',

    // Onboarding
    'onboarding.location.title': 'Location',
    'onboarding.location.text': 'Allow maps to access your location while you use the app?',
    'onboarding.location.allow': 'Allow',
    'onboarding.location.skip': 'Skip for now',
    
    'onboarding.language.title': 'Language',
    'onboarding.language.text': 'Please Select Your Preferred Language',
    'onboarding.language.english': 'English',
    'onboarding.language.hindi': 'हिंदी',
    
    'onboarding.wildcollectors.title': 'Wild Collectors and Farmers',
    'onboarding.wildcollectors.text': 'Welcome wildcollectors and farmers to HerbalChainCollector',
    
    'onboarding.labtechnicians.title': 'Lab Technicians',
    'onboarding.labtechnicians.text': 'Welcome lab technicians to HerbalChainCollector',
    
    'onboarding.stakeholders.title': 'StakeHolders',
    'onboarding.stakeholders.text': 'Welcome StakeHolders to HerbalChainCollector',
    
    'onboarding.consumers.title': 'Consumers',
    'onboarding.consumers.text': 'Welcome Consumers to HerbalChainCollector',
    
    'onboarding.role.title': 'Select your Role',
    'onboarding.role.text': 'Choose your role to get started',
    'onboarding.role.wildcollector': 'Wild Collector',
    'onboarding.role.labtechnician': 'Lab Technician',
    'onboarding.role.stakeholder': 'Stakeholder',
    'onboarding.role.consumer': 'Consumer',
  },
  
  hi: {
    // App
    'app.title': 'हर्बचेन कलेक्टर',
    'app.welcome': 'हर्बचेन कलेक्टर में आपका स्वागत है',
    'app.description': 'सुरक्षित और पारदर्शी जड़ी-बूटी आपूर्ति श्रृंखला प्रबंधन',
    
    // Navigation  
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.wallet': 'वॉलेट',
    'nav.kyc': 'केवाईसी सत्यापन',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.collections': 'संग्रह',
    'nav.reports': 'रिपोर्ट',
    'nav.settings': 'सेटिंग्स',
    
    // Common UI
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.export': 'निर्यात',
    'common.import': 'आयात',
    'common.download': 'डाउनलोड',
    'common.upload': 'अपलोड',
    'common.view': 'देखें',
    'common.close': 'बंद करें',
    'common.open': 'खोलें',
    'common.select': 'चुनें',
    'common.confirm': 'पुष्टि करें',
    'common.continue': 'जारी रखें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.finish': 'समाप्त',
    
    // Language
    'common.language': 'भाषा',
    'common.english': 'English',
    'common.hindi': 'हिंदी',
    
    // Forms
    'form.required': 'आवश्यक',
    'form.optional': 'वैकल्पिक',
    'form.error': 'त्रुटि',
    'form.success': 'सफलता',
    'form.warning': 'चेतावनी',
    'form.info': 'जानकारी',
    
    // KYC
    'kyc.title': 'केवाईसी सत्यापन',
    'kyc.subtitle': 'अपनी पहचान का सत्यापन पूरा करें',
    'kyc.button': 'केवाईसी प्रक्रिया शुरू करें',
    'kyc.status.pending': 'लंबित',
    'kyc.status.approved': 'स्वीकृत',
    'kyc.status.rejected': 'अस्वीकृत',
    
    // KYC Form
    'kyc.form.title': 'केवाईसी पंजीकरण',
    'kyc.form.fullname': 'पूरा नाम',
    'kyc.form.location': 'स्थान',
    'kyc.form.email': 'ईमेल',
    'kyc.form.password': 'पासवर्ड',
    'kyc.form.governmentId': 'सरकारी पहचान',
    'kyc.form.submit': 'केवाईसी जमा करें',
    'kyc.form.dragHint': 'आगे बढ़ने के लिए अपना KYC पूरा करें',
    'kyc.form.progress.continue': 'खींचते रहें...',
    'kyc.form.progress.almost': 'लगभग हो गया...',
    'kyc.form.progress.more': 'बस थोड़ा और...',
    'kyc.form.progress.perfect': 'बहुत बढ़िया!',
    
    // KYC Carousel
    'kyc.carousel.collectors.title': 'जंगली संग्रहकर्ता',
    'kyc.carousel.collectors.primary': 'प्रामाणिक संग्रह',
    'kyc.carousel.collectors.secondary': 'सत्यापित प्रामाणिकता के साथ जड़ी-बूटियों को उनके प्राकृतिक आवास से सीधे एकत्रित करें',
    
    'kyc.carousel.technicians.title': 'प्रयोगशाला तकनीशियन',
    'kyc.carousel.technicians.primary': 'गुणवत्ता परीक्षण',
    'kyc.carousel.technicians.secondary': 'वैज्ञानिक परीक्षण और सत्यापन के माध्यम से उत्पाद की गुणवत्ता सुनिश्चित करें',
    
    'kyc.carousel.stakeholders.title': 'हितधारक',
    'kyc.carousel.stakeholders.primary': 'आपूर्ति श्रृंखला प्रबंधन',
    'kyc.carousel.stakeholders.secondary': 'संपूर्ण जड़ी-बूटी आपूर्ति श्रृंखला प्रक्रिया का प्रबंधन और निरीक्षण करें',
    
    'kyc.carousel.consumers.title': 'उपभोक्ता',
    'kyc.carousel.consumers.primary': 'सत्यापित उत्पाद',
    'kyc.carousel.consumers.secondary': 'पूर्ण ट्रेसेबिलिटी के साथ प्रामाणिक, परीक्षित जड़ी-बूटियों तक पहुंच',
    
    // Wallet
    'wallet.title': 'वॉलेट',
    'wallet.subtitle': 'अपना ब्लॉकचेन वॉलेट कनेक्शन प्रबंधित करें',
    'wallet.balance': 'शेष राशि',
    'wallet.address': 'पता',
    'wallet.connect': 'वॉलेट कनेक्ट करें',
    'wallet.disconnect': 'डिस्कनेक्ट',
    'wallet.connected': 'कनेक्ट किया गया',
    'wallet.connection.success': 'वॉलेट सफलतापूर्वक कनेक्ट हुआ!',
    'wallet.connection.failed': 'वॉलेट कनेक्शन विफल',
    'wallet.connection.trying': 'कनेक्ट हो रहा है...',
    'wallet.browser.detected': 'ब्राउज़र वॉलेट का पता चला',
    'wallet.mobile.connect': 'WalletConnect के माध्यम से कनेक्ट करें',
    'wallet.status.connected': 'वॉलेट स्थिति: कनेक्ट',
    'wallet.status.disconnected': 'वॉलेट स्थिति: डिस्कनेक्ट',
    'wallet.continue': 'डैशबोर्ड पर जाएं',
    
    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.overview': 'अवलोकन',
    'dashboard.recent': 'हाल की गतिविधि',
    'dashboard.stats': 'आंकड़े',
    
    // Collections
    'collection.title': 'संग्रह कार्यक्रम',
    'collection.subtitle': 'अपनी जड़ी-बूटी संग्रह घटना दर्ज करें',
    'collection.create': 'संग्रह बनाएं',
    'collection.date': 'संग्रह तिथि',
    'collection.location': 'स्थान',
    'collection.herbs': 'एकत्रित जड़ी-बूटियां',
    'collection.quantity': 'मात्रा',
    'collection.quality': 'गुणवत्ता',
    'collection.submit': 'संग्रह दर्ज करें',
    'collection.success': 'संग्रह सफलतापूर्वक दर्ज किया गया!',
    
    // Collection Form Fields
    'collection.form.timestamp': 'समयचिह्न',
    'collection.form.collectorId': 'संग्रहकर्ता आईडी',
    'collection.form.location.label': 'स्थान',
    'collection.form.herbName': 'जड़ी-बूटी का नाम',
    'collection.form.herbName.placeholder': 'जड़ी-बूटी का नाम दर्ज करें',
    'collection.form.quantity.label': 'मात्रा (किलो)',
    'collection.form.quantity.placeholder': 'मात्रा दर्ज करें',
    'collection.form.image': 'जड़ी-बूटी की तस्वीर',
    'collection.form.image.select': 'तस्वीर चुनें',
    'collection.form.image.change': 'तस्वीर बदलें',
    'collection.form.quality': 'प्रारंभिक गुणवत्ता आकलन',
    'collection.form.quality.placeholder': 'गुणवत्ता, स्थिति और रूप-रंग का वर्णन करें',
    'collection.form.details': 'अतिरिक्त विवरण',
    'collection.form.details.placeholder': 'संग्रह के बारे में कोई अतिरिक्त जानकारी',
    'collection.form.loading.collectorId': 'लोड हो रहा है...',
    'collection.form.loading.location': 'स्थान प्राप्त कर रहे हैं...',
    'collection.form.location.denied': 'स्थान पहुंच अस्वीकार',
    
    // Image Selection Modal
    'image.modal.title': 'तस्वीर चुनें',
    'image.modal.camera': 'फोटो खींचें',
    'image.modal.upload': 'गैलरी से अपलोड करें',
    
    // Health Analysis
    'health.analyze': 'पौधे की स्वास्थ्य जांच करें',
    'health.analyzing': 'स्वास्थ्य जांच हो रही है...',
    'health.title': 'पौधे की स्वास्थ्य जांच के परिणाम',
    'health.subtitle': 'आपकी जड़ी-बूटी की स्वास्थ्य स्थिति का AI-संचालित विश्लेषण',
    'health.identification': 'पौधे की पहचान',
    'health.status': 'स्वास्थ्य स्थिति',
    'health.quality': 'गुणवत्ता आकलन',
    'health.diseases': 'रोग और कीट विश्लेषण',
    'health.recommendations': 'सुझाव',
    'health.error': 'पौधे की स्वास्थ्य जांच असफल। कृपया पुनः प्रयास करें।',
    
    // Status messages
    'status.success': 'कार्यवाही सफलतापूर्वक पूरी हुई',
    'status.error': 'एक त्रुटि हुई',
    'status.warning': 'चेतावनी: कृपया जानकारी की जांच करें',
    'status.info': 'जानकारी अपडेट की गई',

    // Onboarding
    'onboarding.location.title': 'स्थान',
    'onboarding.location.text': 'क्या आप मैप्स को अपना स्थान एक्सेस करने की अनुमति देना चाहते हैं?',
    'onboarding.location.allow': 'अनुमति दें',
    'onboarding.location.skip': 'अभी छोड़ें',
    
    'onboarding.language.title': 'भाषा',
    'onboarding.language.text': 'कृपया अपनी पसंदीदा भाषा चुनें',
    'onboarding.language.english': 'English',
    'onboarding.language.hindi': 'हिंदी',
    
    'onboarding.wildcollectors.title': 'जंगली संग्रहकर्ता और किसान',
    'onboarding.wildcollectors.text': 'हर्बलचेन कलेक्टर में जंगली संग्रहकर्ताओं और किसानों का स्वागत है',
    
    'onboarding.labtechnicians.title': 'प्रयोगशाला तकनीशियन',
    'onboarding.labtechnicians.text': 'हर्बलचेन कलेक्टर में प्रयोगशाला तकनीशियनों का स्वागत है',
    
    'onboarding.stakeholders.title': 'हितधारक',
    'onboarding.stakeholders.text': 'हर्बलचेन कलेक्टर में हितधारकों का स्वागत है',
    
    'onboarding.consumers.title': 'उपभोक्ता',
    'onboarding.consumers.text': 'हर्बलचेन कलेक्टर में उपभोक्ताओं का स्वागत है',
    
    'onboarding.role.title': 'अपनी भूमिका चुनें',
    'onboarding.role.text': 'शुरू करने के लिए अपनी भूमिका चुनें',
    'onboarding.role.wildcollector': 'जंगली संग्रहकर्ता',
    'onboarding.role.labtechnician': 'प्रयोगशाला तकनीशियन',
    'onboarding.role.stakeholder': 'हितधारक',
    'onboarding.role.consumer': 'उपभोक्ता',
  },
} as const;

// Type for translation keys
export type TranslationKey = keyof typeof translations.en;
