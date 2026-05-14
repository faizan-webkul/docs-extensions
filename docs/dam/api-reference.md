# Unopim DAM API Documentation

RESTful API for Digital Asset Management

---

## Overview

The Unopim DAM (Digital Asset Management) API provides a comprehensive RESTful interface for managing digital assets, directories, properties, tags, comments, and linked resources. This API enables developers to integrate Unopim's DAM capabilities into their applications.

---


## Authentication

All API endpoints require Bearer Token authentication.

### Headers Required

```
Authorization: Bearer {{token}}
Accept: application/json
```

**Parameters:**
- `{token}` - Your API authentication token
- `Accept: application/json` - Specifies the response format

**Example Request:**
```
curl -X GET "{{url}}/api/v1/rest/assets" \
  -H "Authorization: Bearer your_token_here" \
  -H "Accept: application/json"
```

---

## Base URL

All API requests should use the following base URL:

```
{{url}}/api/v1/rest
```

**Parameters:**
- `{url}` - Your Unopim installation URL (e.g., https://yourdomain.com)

**Example:**
```
https://yourdomain.com/api/v1/rest
```

---

## Official Documentation

To interact with Unopim DAM's API, you can use our official Postman collection:

- **[UnoPim DAM APIs Documentation](https://documenter.getpostman.com/view/21990056/2sA3kXE17F)** - Detailed information about all available API endpoints, parameters, and response formats
- **[UnoPim DAM APIs on Postman](https://www.postman.com/unopim/unopim-apis/collection/4385199-086948c4-9e81-4271-abb7-6d6995a67304?ctx=info)** - Official Postman collection with ready-to-use API requests

This collection provides ready-to-use API requests for various UnoPim DAM API features. You can import it directly into your Postman workspace and start testing the APIs.

The documentation and collection include:
- Digital assets management endpoints
- Directory management endpoints
- Properties management endpoints
- Tags management endpoints
- Comments management endpoints
- Linked resources endpoints
- Complete request/response examples

