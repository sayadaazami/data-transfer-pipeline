GET /person_2025_12

DELETE /person_2025_12

PUT /person_2025_12
{
  "aliases": { "person_new": {} },
  "settings": {
    "index": {
      "number_of_replicas": 1,
      "number_of_shards": 30,
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
      "filter": {
        "job_title_synonyms": {
          "type": "synonym_graph",
          "synonyms": [
            // items
            "ceo => chief executive officer",
            "cfo => chief financial officer",
            "coo => chief operating officer",
            "cto => chief technology officer",
            "cmo => chief marketing officer",
            "cpo => chief product officer",
            "cpo => chief people officer",
            "cpo => chief performance officer",
            "cpo => chief privacy officer",
            "chro => chief human resources officer",
            "cso => chief strategy officer",
            "cso => chief security officer",
            "cco => chief commercial officer",
            "cco => chief communications officer",
            "cco => chief compliance officer",
            "cao => chief administrative officer",
            "cio => chief investment officer",
            "cio => chief information officer",
            "clo => chief legal officer",
            "clo => chief learning officer",
            "cko => chief knowledge officer",
            "cdo => chief data officer",
            "cdo => chief digital officer",
            "cdo => chief diversity officer",
            "cro => chief revenue officer",
            "cro => chief risk officer",
            "cro => chief relationship officer",
            "cxo => chief experience officer",
            "cgo => chief growth officer",
            "cdao => chief data analytics officer",
            "ccdo => chief customer development officer",
            "ciso => chief information security officer",
            "caio => chief artificial intelligence officer",
            "cbo => chief business officer",
            "cfoo => chief financial and operating officer",
            "csco => chief supply chain officer",
            "cpeo => chief people and equity officer",
            "ccro => chief corporate responsibility officer",
            "cino => chief innovation officer",
            "cge => chief green officer",
            "cge => chief of global engagement",
            "ctpo => chief technology and product officer",
            "coio => chief operating and innovation officer",
            "cme => chief medical executive",
            "cdmo => chief digital marketing officer",
            "cvo => chief visionary officer",
            "cse => chief sustainability executive",
            "csio => chief science and innovation officer",
            "csio => chief sales and innovation officer",
            "cdso => chief digital strategy officer",
            "gc => general counsel",
            "evp => executive vice president",
            "svp => senior vice president",
            "vp => vice president",
            "dvp => divisional vice president",
            "cexo => chief executive officer of excellence",
            "eco => ethics and compliance officer",
            "ccao => chief customer advocacy officer",
            "clro => chief legal and regulatory officer"
          ]
        }
      },
      "analyzer": {
        "lowercase": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [ "lowercase" ]
        },
        "lowercase_ascii": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [ "lowercase", "asciifolding" ]
        },
        "job_title": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [ "lowercase", "job_title_synonyms" ]
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
        "lowercase_ascii": {
          "type": "custom",
          "filter": [ "lowercase", "asciifolding" ]
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
    "dynamic_templates": [
      {
        "flat_educations_entries": {
          "path_match": "flat_educations.*",
          "mapping": {
            "properties": {
              "school": {
                "properties": {
                  "urn": { "type": "long" },
                  "name": {
                    "type": "text",
                    "analyzer": "lowercase",
                    "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                  },
                  "id": { "type": "keyword" },
                  "url": {
                    "type": "text",
                    "analyzer": "lowercase",
                    "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                  }
                }
              },
              "grade": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "field_of_study": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "degree_name": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "date": {
                "properties": {
                  "start": { "type": "date" },
                  "end": { "type": "date" }
                }
              }
            }
          }
        }
      }
    ],
    "runtime": {},
    "properties": {
      "id": { "type": "keyword" },
      "identifier": { "type": "keyword", "index": false },
      "entity_urn": { "type": "keyword", "index": false },
      "object_urn": { "type": "long" },
      "profile": {
        "properties": {
          "first_name": {
            "type": "text",
            "analyzer": "lowercase_ascii",
            "fields": {
              "keyword": { "type": "keyword", "normalizer": "lowercase_ascii" }
            }
          },
          "middle_name": {
            "type": "text",
            "analyzer": "lowercase_ascii",
            "fields": {
              "keyword": { "type": "keyword", "normalizer": "lowercase_ascii" }
            }
          },
          "last_name": {
            "type": "text",
            "analyzer": "lowercase_ascii",
            "fields": {
              "keyword": { "type": "keyword", "normalizer": "lowercase_ascii" }
            }
          },
          "full_name": {
            "type": "text",
            "analyzer": "lowercase_ascii",
            "fields": {
              "keyword": { "type": "keyword", "normalizer": "lowercase_ascii" }
            }
          },
          "headline": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "title": {
            "type": "text",
            "analyzer": "job_title",
            "fields": {
              "keyword": { "type": "keyword" }
            }
          },
          "summary": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "gender": { "type": "keyword", "normalizer": "lowercase" },
          "birth_date": { "type": "date", "format": "yyyy-MM-dd||date_optional_time||epoch_millis" },
          "picture": {
            "properties": {
              "source": { "type": "text", "index": false },
              "uploaded": { "type": "boolean", "index": false }
            }
          },
          "background": {
            "properties": {
              "source": { "type": "text", "index": false },
              "uploaded": { "type": "boolean", "index": false }
            }
          }
        }
      },
      "link": {
        "properties": {
          "facebook": {
            "type": "text",
            "analyzer": "url",
            "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
          },
          "github": {
            "type": "text",
            "analyzer": "url",
            "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
          },
          "linkedin": {
            "type": "text",
            "analyzer": "url",
            "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
          },
          "twitter": {
            "type": "text",
            "analyzer": "url",
            "fields": { "keyword": { "type": "keyword", "normalizer": "url" } }
          }
        }
      },
      "contact": {
        "properties": {
          "email": {
            "properties": {
              "business": {
                "properties": {
                  "value": {
                    "type": "text",
                    "analyzer": "lowercase",
                    "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                  },
                  "mxProvider": { "type": "keyword", "normalizer": "lowercase" },
                  "status": { "type": "keyword", "normalizer": "lowercase" },
                  "subStatus": { "type": "keyword", "normalizer": "lowercase" },
                  "catchAll": { "type": "boolean" },
                  "free": { "type": "boolean" },
                  "generic": { "type": "boolean", "index": false },
                  "confidence": { "type": "integer", "index": false },
                  "mxRecord": { "type": "text", "index": false },
                  "processedAt": { "type": "date", "index": false }
                }
              },
              "others": {
                "properties": {
                  "value": {
                    "type": "text",
                    "analyzer": "lowercase",
                    "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                  },
                  "mxProvider": { "type": "keyword", "normalizer": "lowercase" },
                  "status": { "type": "keyword", "normalizer": "lowercase" },
                  "subStatus": { "type": "keyword", "normalizer": "lowercase" },
                  "catchAll": { "type": "boolean" },
                  "free": { "type": "boolean" },
                  "generic": { "type": "boolean", "index": false },
                  "confidence": { "type": "integer", "index": false },
                  "mxRecord": { "type": "text", "index": false },
                  "processedAt": { "type": "date", "index": false }
                }
              },
              "personal": {
                "properties": {
                  "value": {
                    "type": "text",
                    "analyzer": "lowercase",
                    "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
                  },
                  "mxProvider": { "type": "keyword", "normalizer": "lowercase" },
                  "status": { "type": "keyword", "normalizer": "lowercase" },
                  "subStatus": { "type": "keyword", "normalizer": "lowercase" },
                  "catchAll": { "type": "boolean" },
                  "free": { "type": "boolean" },
                  "generic": { "type": "boolean", "index": false },
                  "confidence": { "type": "integer", "index": false },
                  "mxRecord": { "type": "text", "index": false },
                  "processedAt": { "type": "date", "index": false }
                }
              }
            }
          },
          "phone": {
            "properties": {
              "mobile": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "others": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              }
            }
          }
        }
      },
      "location": {
        "properties": {
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
          "default": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "short": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "sanitized": {
            "properties": {
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
              "default": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "short": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              }
            }
          }
        }
      },
      "industry": {
        "type": "text",
        "analyzer": "lowercase",
        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
      },
      "skills": {
        "type": "text",
        "analyzer": "lowercase",
        "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
      },
      "languages": {
        "properties": {
          "primary_locale": {
            "properties": {
              "country": { "type": "keyword", "normalizer": "lowercase" },
              "language": { "type": "keyword", "normalizer": "lowercase" }
            }
          },
          "profile_languages": {
            "properties": {
              "name": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "proficiency": { "type": "keyword", "normalizer": "lowercase" }
            }
          },
          "supported_locales": {
            "properties": {
              "country": { "type": "keyword", "normalizer": "lowercase" },
              "language": { "type": "keyword", "normalizer": "lowercase" }
            }
          }
        }
      },
      "organizations": {
        "properties": {
          "date": {
            "properties": {
              "end": { "type": "date" },
              "start": { "type": "date" }
            }
          },
          "name": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "position": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          }
        }
      },
      "department": {
        "properties": {
          "departments": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "functions": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "seniority": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "sub_departments": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          }
        }
      },
      "awards": {
        "properties": {
          "title": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "description": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "issuer": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "date": { "type": "date", "index": false }
        }
      },
      "certifications": {
        "properties": {
          "name": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "authority": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "license_number": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "display_source": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "url": {
            "type": "text",
            "index": false,
            "fields": { "keyword": { "type": "keyword", "index": false } }
          },
          "company": {
            "properties": {
              "id": { "type": "keyword" },
              "name": { "type": "text" },
              "urn": { "type": "long", "index": false },
              "url": { "type": "text", "index": false },
              "logo": { "type": "text", "index": false }
            }
          },
          "date": {
            "properties": {
              "end": { "type": "date" },
              "start": { "type": "date" }
            }
          }
        }
      },
      "causes": {
        "type": "text",
        "index": false,
        "fields": { "keyword": { "type": "keyword", "index": false } }
      },
      "courses": {
        "properties": {
          "name": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "number": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          }
        }
      },
      "patents": {
        "properties": {
          "title": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "issuer": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "description": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "patent_number": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "application_number": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "date": { "type": "date" },
          "inventors": {
            "properties": {
              "type": { "type": "keyword", "index": false },
              "first_name": { "type": "text", "index": false },
              "last_name": { "type": "text", "index": false },
              "headline": { "type": "text", "index": false },
              "sub_title": { "type": "text", "index": false },
              "profile_id": { "type": "keyword", "index": false },
              "profile_picture": { "type": "text", "index": false }
            }
          }
        }
      },
      "projects": {
        "properties": {
          "title": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "description": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "date": {
            "properties": {
              "end": { "type": "date" },
              "start": { "type": "date" }
            }
          },
          "contributors": {
            "properties": {
              "type": { "type": "keyword", "index": false },
              "first_name": { "type": "text", "index": false },
              "last_name": { "type": "text", "index": false },
              "headline": { "type": "text", "index": false },
              "sub_title": { "type": "text", "index": false },
              "profile_id": { "type": "keyword", "index": false },
              "profile_picture": { "type": "text", "index": false }
            }
          }
        }
      },
      "publications": {
        "properties": {
          "name": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "publisher": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "url": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "date": { "type": "date" },
          "authors": {
            "properties": {
              "type": { "type": "keyword", "index": false },
              "first_name": { "type": "text", "index": false },
              "last_name": { "type": "text", "index": false },
              "headline": { "type": "text", "index": false },
              "sub_title": { "type": "text", "index": false },
              "profile_id": { "type": "keyword", "index": false },
              "profile_picture": { "type": "text", "index": false }
            }
          }
        }
      },
      "test_scores": {
        "properties": {
          "name": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "score": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "date": { "type": "date", "index": false }
        }
      },
      "treasury_media": {
        "properties": {
          "title": {
            "type": "text",
            "index": false,
            "fields": { "keyword": { "type": "keyword", "index": false } }
          },
          "description": {
            "type": "text",
            "index": false,
            "fields": { "keyword": { "type": "keyword", "index": false } }
          },
          "url": {
            "type": "text",
            "index": false,
            "fields": { "keyword": { "type": "keyword", "index": false } }
          },
          "image": { "type": "text", "index": false }
        }
      },
      "volunteer_experiences": {
        "properties": {
          "role": { "type": "text", "index": false },
          "description": { "type": "text", "index": false },
          "cause": { "type": "text", "index": false },
          "date": {
            "properties": {
              "end": { "type": "date" },
              "start": { "type": "date" }
            }
          },
          "company": {
            "properties": {
              "id": { "type": "keyword" },
              "name": { "type": "text" },
              "urn": { "type": "long", "index": false },
              "url": { "type": "text", "index": false },
              "logo": { "type": "text", "index": false }
            }
          }
        }
      },
      "position_groups": {
        "properties": {
          "current": { "type": "boolean" },
          "date": {
            "properties": {
              "end": { "type": "date" },
              "start": { "type": "date" }
            }
          },
          "company": {
            "properties": {
              "id": { "type": "keyword" },
              "name": { "type": "text" },
              "urn": { "type": "long", "index": false },
              "url": { "type": "text", "index": false },
              "logo": { "type": "text", "index": false },
              "employees": {
                "properties": {
                  "start": { "type": "long", "index": false },
                  "end": { "type": "long", "index": false }
                }
              }
            }
          },
          "profile_positions": {
            "properties": {
              "current": { "type": "boolean" },
              "employment_type": { "type": "keyword", "normalizer": "lowercase" },
              "date": {
                "properties": {
                  "end": { "type": "date" },
                  "start": { "type": "date" }
                }
              },
              "title": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "description": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "location": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "company": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              }
            }
          }
        }
      },
      "statistics": {
        "properties": {
          "experience": {
            "properties": {
              "prev_job_titles": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "tenure": {
                "properties": {
                  "company": { "type": "date" },
                  "role": { "type": "date" },
                  "start": { "type": "date" },
                  "title": { "type": "date" }
                }
              }
            }
          },
          "network": {
            "properties": {
              "connections_count": { "type": "long" },
              "followable": { "type": "boolean" },
              "followers_count": { "type": "long" },
              "influencer": { "type": "boolean" }
            }
          }
        }
      },
      "member_badges": {
        "properties": {
          "creator": { "type": "boolean" },
          "hiring": { "type": "boolean" },
          "jobSeeker": { "type": "boolean" },
          "openLink": { "type": "boolean" },
          "openToWork": { "type": "boolean" },
          "premium": { "type": "boolean" }
        }
      },
      "education": {
        "properties": {
          "date": {
            "properties": {
              "end": { "type": "date" },
              "start": { "type": "date" }
            }
          },
          "degree_name": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "field_of_study": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "grade": {
            "type": "text",
            "analyzer": "lowercase",
            "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
          },
          "school": {
            "properties": {
              "id": { "type": "keyword" },
              "name": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "urn": { "type": "long", "index": false },
              "url": { "type": "text", "index": false },
              "logo": { "type": "text", "index": false }
            }
          }
        }
      },
      "flat_educations": {
        "dynamic": "true",
        "properties": {}
      },
      "work_experience": {
        "properties": {
          "company": {
            "properties": {
              "current": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "past": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "latest": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              }
            }
          },
          "title": {
            "properties": {
              "current": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              },
              "past": {
                "type": "text",
                "analyzer": "lowercase",
                "fields": { "keyword": { "type": "keyword", "normalizer": "lowercase" } }
              }
            }
          }
        }
      },
      "hash": {
        "properties": {
          "awards": { "type": "keyword" },
          "causes": { "type": "keyword" },
          "certifications": { "type": "keyword" },
          "courses": { "type": "keyword" },
          "department": { "type": "keyword" },
          "educations": { "type": "keyword" },
          "languages": { "type": "keyword" },
          "organizations": { "type": "keyword" },
          "patents": { "type": "keyword" },
          "position_groups": { "type": "keyword" },
          "projects": { "type": "keyword" },
          "publications": { "type": "keyword" },
          "skills": { "type": "keyword" },
          "statistics": { "type": "keyword" },
          "test_scores": { "type": "keyword" },
          "volunteer_experiences": { "type": "keyword" },
          "profile": { "type": "keyword" },
          "link": { "type": "keyword" },
          "location": { "type": "keyword" },
          "industry": { "type": "keyword" }
        }
      },
      "company": {
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
          }
        }
      }
    }
  }
}
/*
🔶
🔶
🔶
🔶
*/
PUT /person_2025_12/_settings
{ "index": { "refresh_interval": -1 } }