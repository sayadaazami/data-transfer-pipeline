GET /company_2025_12

DELETE /company_2025_12


PUT /company_2025_12
{
    "aliases": { "company_new": {} },
    "settings": {
        "index": {
            "number_of_replicas": 1,
            "number_of_shards": 1,
            "mapping": { "total_fields": { "limit": 50000 } },
            "unassigned": { "node_left": { "delayed_timeout": "30m" } },
            "indexing": { "slowlog": { "threshold": { "index": { "warn": "10s" } } } },
            "search": {
                "slowlog": {
                    "include": { "user": "true" },
                    "threshold": {
                        "fetch": { "warn": "5s" },
                        "query": { "warn": "5s" }
                    }
                }
            }
        },
        "analysis": {
            "char_filter": {
                "url_prefix_stripper": {
                    "type": "pattern_replace",
                    "pattern": "https?://|www\\.",
                    "replacement": ""
                }
            },
            "analyzer": {
                "lowercase": {
                    "type": "custom",
                    "char_filter": [ "url_prefix_stripper" ],
                    "tokenizer": "standard",
                    "filter": [ "lowercase" ]
                },
                "url": {
                    "type": "custom",
                    "char_filter": [ "url_prefix_stripper" ],
                    "tokenizer": "standard",
                    "filter": [ "lowercase" ]
                }
            },
            "normalizer": {
                "lowercase": {
                    "type": "custom",
                    "filter": [ "lowercase" ]
                },
                "url": {
                    "type": "custom",
                    "char_filter": [ "url_prefix_stripper" ],
                    "filter": [ "lowercase" ]
                }
            }
        }
    },
    "mappings": {
        "dynamic": "strict",
        "dynamic_templates": [],
        "runtime": {
        },
        "properties": {
            "id": { "type": "keyword" },
            "urn": { "type": "long" },
            "summary": {
                "properties": {
                    "type": { "type": "keyword", "normalizer": "lowercase" },
                    "name": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "legal_name": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "industry": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "headline": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "description": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "short_description": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "llm_description": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "overview": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "seo": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "founded_year": { "type": "long" },
                    "staff": {
                        "properties": {
                            "range": {
                                "properties": {
                                    "end": { "type": "long" },
                                    "start": { "type": "long" }
                                }
                            },
                            "total": { "type": "long" }
                        }
                    },
                    "logo": {
                        "properties": {
                            "source": { "type": "text", "index": false },
                            "uploaded": { "type": "boolean", "index": false }
                        }
                    }
                }
            },
            "link": {
                "properties": {
                    "linkedin": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "domain": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "domain_ltd": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "website": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "blog": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "twitter": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "youtube": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "facebook": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "instagram": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "angellist": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "crunchbase": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    },
                    "spotify": {
                        "type": "text",
                        "analyzer": "url",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
                    }
                }
            },
            "analytics": {
                "properties": {
                    "apptopia": {
                        "properties": {
                            "apps": {
                                "properties": {
                                    "image": { "type": "text", "index": false },
                                    "monthly_downloads": { "type": "long", "index": false },
                                    "name": { "type": "text", "index": false },
                                    "stores": { "type": "text", "index": false }
                                }
                            },
                            "growth": { "type": "float", "index": false },
                            "total_apps": { "type": "long", "index": false },
                            "total_downloads": { "type": "long", "index": false }
                        }
                    },
                    "bombora": {
                        "properties": {
                            "topics": {
                                "properties": {
                                    "category": { "type": "keyword", "index": false },
                                    "growth": { "type": "float", "index": false },
                                    "score": { "type": "long", "index": false },
                                    "topic": { "type": "text", "index": false },
                                    "weeks": { "type": "long", "index": false }
                                }
                            },
                            "updated_at": { "type": "date", "index": false }
                        }
                    },
                    "ipqwery": {
                        "properties": {
                            "patent": { "type": "long", "index": false },
                            "trademark": { "type": "long", "index": false }
                        }
                    },
                    "semrush": {
                        "properties": {
                            "locations": {
                                "properties": {
                                    "continent": { "type": "text", "index": false },
                                    "country": { "type": "text", "index": false },
                                    "monthly_visits_growth": { "type": "float", "index": false },
                                    "rank": { "type": "long", "index": false },
                                    "rank_growth": { "type": "float", "index": false },
                                    "share_of_monthly_visits": { "type": "float", "index": false }
                                }
                            },
                            "monthly_visits_growth": { "type": "float", "index": false },
                            "rank": { "type": "long", "index": false },
                            "visits_latest_month": { "type": "long", "index": false },
                            "updated_at": { "type": "date", "index": false }
                        }
                    },
                    "linkedin": {
                        "properties": {
                            "growth": {
                                "properties": {
                                    "accounting": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "administrative": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "all": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "arts_and_design": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "business_development": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "community_and_social_services": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "consulting": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "customer_success_and_support": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "education": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "engineering": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "entrepreneurship": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "finance": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "healthcare_services": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "human_resources": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "information_technology": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "legal": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "marketing": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "media_and_communication": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "military_and_protective_services": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "operations": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "product_management": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "program_and_project_management": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "purchasing": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "quality_assurance": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "real_estate": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "research": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    },
                                    "sales": {
                                        "properties": {
                                            "employee_count": { "type": "long" },
                                            "one": { "type": "long" },
                                            "six": { "type": "long" },
                                            "three": { "type": "long" },
                                            "twelve": { "type": "long" },
                                            "twenty_four": { "type": "long" }
                                        }
                                    }
                                }
                            },
                            "metrics": {
                                "properties": {
                                    "departments": {
                                        "properties": {
                                            "churned": { "type": "long" },
                                            "functions": {
                                                "type": "text",
                                                "analyzer": "lowercase",
                                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                            },
                                            "monthly_percentage_difference": { "type": "long" },
                                            "new": { "type": "long" },
                                            "retained": { "type": "long" }
                                        }
                                    },
                                    "start_date": { "type": "date" }
                                }
                            }
                        }
                    }
                }
            },
            "contact": {
                "properties": {
                    "email": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "phone": {
                        "properties": {
                            "raw": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "sanitized": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            }
                        }
                    },
                    "phones": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    }
                }
            },
            "location": {
                "properties": {
                    "headquarter": {
                        "properties": {
                            "headquarter": { "type": "boolean" },
                            "position": { "type": "geo_point" },
                            "continent": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "country": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "state": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "city": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "street": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "postal_code": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "raw_address": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "sanitized": {
                                "properties": {
                                    "continent": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "country": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "state": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "city": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "street": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "raw_address": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    }
                                }
                            }
                        }
                    },
                    "locations": {
                        "properties": {
                            "headquarter": { "type": "boolean" },
                            "position": { "type": "geo_point" },
                            "continent": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "country": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "state": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "city": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "street": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "postal_code": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "raw_address": {
                                "type": "text",
                                "analyzer": "lowercase",
                                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                            },
                            "sanitized": {
                                "properties": {
                                    "continent": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "country": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "state": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "city": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "street": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    },
                                    "raw_address": {
                                        "type": "text",
                                        "analyzer": "lowercase",
                                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "hashtags": { "type": "keyword" },
            "naics": { "type": "keyword" },
            "sic": { "type": "keyword" },
            "industries_source": {
                "properties": {
                    "crunchbase": {
                        "type": "keyword",
                        "fields": { "keyword": { "type": "keyword" } }
                    },
                    "linkedin": {
                        "type": "keyword",
                        "fields": { "keyword": { "type": "keyword" } }
                    }
                }
            },
            "keywords": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
            },
            "languages": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
            },
            "sub_organizations": { "type": "keyword" },
            "technologies": {
                "properties": {
                    "category": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    },
                    "name": {
                        "type": "text",
                        "analyzer": "lowercase",
                        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                    }
                }
            },
            "financial": {
                "properties": {
                    "funding": {
                        "properties": {
                            "type": { "type": "keyword", "normalizer": "lowercase" },
                            "date": { "type": "date" },
                            "total_amount": { "type": "long" },
                            "last_amount": { "type": "long" },
                            "num_investor": { "type": "long", "index": false },
                            "num_funding_rounds": { "type": "long", "index": false },
                            "rounds": {
                                "properties": {
                                    "announced_at": { "type": "date", "index": false },
                                    "investors": { "type": "text", "index": false },
                                    "raised_amount": { "type": "long", "index": false },
                                    "type": { "type": "keyword", "index": false }
                                }
                            }
                        }
                    },
                    "revenue": {
                        "properties": {
                            "annual": {
                                "properties": {
                                    "bound": { "type": "long" },
                                    "end": { "type": "long" },
                                    "start": { "type": "long" }
                                }
                            }
                        }
                    },
                    "aberdeen": { "properties": { "it_spend": { "type": "long", "index": false } } },
                    "acquisition": {
                        "properties": {
                            "contents": {
                                "properties": {
                                    "announced_at": { "type": "date", "index": false },
                                    "identifier": {
                                        "properties": {
                                            "id": { "type": "keyword", "index": false },
                                            "image": { "type": "text", "index": false },
                                            "name": { "type": "text", "index": false }
                                        }
                                    },
                                    "price": { "type": "long", "index": false },
                                    "role": { "type": "text", "index": false }
                                }
                            },
                            "total": { "type": "long", "index": false }
                        }
                    },
                    "diversity_investment": {
                        "properties": {
                            "contents": {
                                "properties": {
                                    "announced_at": { "type": "date", "index": false },
                                    "diversity_spotlights": {
                                        "properties": {
                                            "id": { "type": "keyword", "index": false },
                                            "name": { "type": "text", "index": false }
                                        }
                                    },
                                    "identifier": {
                                        "properties": {
                                            "id": { "type": "keyword", "index": false },
                                            "name": { "type": "text", "index": false },
                                            "image": { "type": "text", "index": false }
                                        }
                                    },
                                    "round": {
                                        "properties": {
                                            "identifier": {
                                                "properties": {
                                                    "id": { "type": "keyword", "index": false },
                                                    "name": { "type": "text", "index": false },
                                                    "image": { "type": "text", "index": false }
                                                }
                                            },
                                            "raised_amount": { "type": "long", "index": false },
                                            "type": { "type": "keyword", "index": false }
                                        }
                                    }
                                }
                            },
                            "total": { "type": "long", "index": false }
                        }
                    },
                    "exit": {
                        "properties": {
                            "contents": {
                                "properties": {
                                    "description": { "type": "text", "index": false },
                                    "identifier": {
                                        "properties": {
                                            "id": { "type": "keyword", "index": false },
                                            "name": { "type": "text", "index": false },
                                            "image": { "type": "text", "index": false }
                                        }
                                    }
                                }
                            },
                            "total": { "type": "long", "index": false }
                        }
                    },
                    "investment": {
                        "properties": {
                            "contents": {
                                "properties": {
                                    "identifier": {
                                        "properties": {
                                            "id": { "type": "keyword" },
                                            "name": { "type": "text", "index": false },
                                            "image": { "type": "text", "index": false }
                                        }
                                    },
                                    "is_lead": { "type": "boolean", "index": false },
                                    "round": {
                                        "properties": {
                                            "identifier": {
                                                "properties": {
                                                    "id": { "type": "keyword", "index": false },
                                                    "name": { "type": "text", "index": false },
                                                    "image": { "type": "text", "index": false }
                                                }
                                            },
                                            "raised_amount": { "type": "long", "index": false },
                                            "type": { "type": "keyword", "index": false }
                                        }
                                    }
                                }
                            },
                            "leads": { "type": "long", "index": false },
                            "total": { "type": "long", "index": false }
                        }
                    },
                    "ipo": {
                        "properties": {
                            "date": { "type": "date" },
                            "link": {
                                "properties": {
                                    "label": { "type": "text", "index": false },
                                    "value": { "type": "text", "index": false }
                                }
                            },
                            "raised_amount": { "type": "long", "index": false },
                            "share_price": { "type": "long", "index": false },
                            "valuation": { "type": "long", "index": false }
                        }
                    }
                }
            },
            "has_embedding": { "type": "long" }
        }
    }
}
/*
🔶
🔶
🔶
🔶
*/
PUT /company_2025_12/_settings
{ "index": { "refresh_interval": -1 } }