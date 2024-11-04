
module.exports = {
    errors: {
      'error.user_exists': {
        httpStatus: 400,
        translations: {
          en: 'User already exists',
          fr: "L'utilisateur existe déjà"
        }
      },
      'error.user_not_found': {
        httpStatus: 400,
        translations: {
          en: 'User not found',
          fr: "Utilisateur non trouvé"
        }
      },
      'error.wrong_password': {
        httpStatus: 400,
        translations: {
          en: 'Wrong password',
          fr: 'Mot de passe incorrect'
        }
      },
      'error.invalid_token': {
        httpStatus: 401,
        translations: {
          en: 'Invalid token',
          fr: 'Jeton invalide'
        }
      },
      'error.token_missing': {
        httpStatus: 401,
        translations: {
          en: 'Token missing',
          fr: 'Jeton manquant'
        }
      },
      'error.community_not_found': {
  httpStatus: 404,
  translations: {
    en: 'Community not found',
    fr: 'Communauté non trouvée'
  }
},
      'error.category_not_found': {
  httpStatus: 404,
  translations: {
    en: 'Category not found',
    fr: 'Catégorie non trouvée'
  }
},
      'error.not_found': {
        httpStatus: 404,
        translations: {
          en: "Can't find the requested resource on the server",
          fr: "La ressource demandée est introuvable sur le serveur"
        }
      },
      'error.operation_not_found': {
  httpStatus: 404,
  translations: {
    en: 'Operation not found',
    fr: 'Opération non trouvée'
  }
},
'error.fields_required': {
  httpStatus: 400,
  translations: {
    en: 'All fields are required',
    fr: 'Tous les champs sont obligatoires'
  }
},
'error.product_not_found': {
  httpStatus: 404,
  translations: {
    en: 'Product not found',
    fr: 'Produit non trouvé'
  }
},
'error.invalid_category': {
  httpStatus: 400,
  translations: {
    en: 'Invalid category ID',
    fr: "ID de catégorie invalide"
  }
},
'error.not_authorized': {
  httpStatus: 403,
  translations: {
    en: 'You are not authorized to modify this product',
    fr: "Vous n'êtes pas autorisé à modifier ce produit"
  }
},
'error.max_images_exceeded': {
  httpStatus: 400,
  translations: {
    en: 'Product cannot have more than 10 images',
    fr: 'Le produit ne peut pas avoir plus de 10 images'
  }
},
'error.rate_not_found': {
  httpStatus: 404,
  translations: {
    en: 'Rate not found',
    fr: 'Évaluation non trouvée'
  }
},
'error.invalid_product_id': {
  httpStatus: 400,
  translations: {
    en: 'Invalid product ID',
    fr: "ID de produit invalide"
  }
},
'error.invalid_user_id': {
  httpStatus: 400,
  translations: {
    en: 'Invalid target user ID',
    fr: "ID de l'utilisateur cible invalide"
  }
},
'error.request_not_found': {
  httpStatus: 404,
  translations: {
    en: 'Request not found',
    fr: 'Demande non trouvée'
  }
},
'error.invalid_product_id': {
  httpStatus: 400,
  translations: {
    en: 'Invalid product ID',
    fr: "ID de produit invalide"
  }
},
'error.invalid_receiver_id': {
  httpStatus: 400,
  translations: {
    en: 'Invalid receiver ID',
    fr: "ID de destinataire invalide"
  }
},
      
      'error.internal_server': {
        httpStatus: 500,
        translations: {
          en: 'Internal server error',
          fr: 'Erreur interne du serveur'
        }
      },
      'error.too_many_requests': {
        httpStatus: 429,
        translations: {
          en: 'Too many requests from this IP, please try again later',
          fr: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard'
        }
      }
    }
  };