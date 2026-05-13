# UnoPIM DAM - Assets Endpoints

Comprehensive guide for managing digital assets via API

## GET - Get All Assets

Retrieve a paginated list of all assets in the system.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets?limit=100&page=1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Parameters:**
- `limit` - Number of results per page (value: 100)
- `page` - Page number (value: 1)

---

## GET - Get Asset by ID

Retrieve a specific asset by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets/390
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## POST - Upload New Asset

Upload a new asset to the DAM system.

**Endpoint:**
```
POST {{url}}/api/v1/rest/assets
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (Form Data):**
- `files[]` - Asset file(s) to upload
- `directory_id` - Directory ID (value: 1)

---

## POST - Re-upload Asset

Re-upload an existing asset file, replacing the current version.

**Endpoint:**
```
POST {{url}}/api/v1/rest/assets/reupload
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (Form Data):**
- `file` - Asset file
- `asset_id` - Asset ID (value: 390)

---

## PUT - Update Asset

Update asset metadata such as file name.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/assets/211
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "file_name": "Update File Name"
}
```

---

## DELETE - Delete Asset

Delete an asset from the DAM system.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/assets/384
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## GET - Download Asset

Download an asset file.

**Endpoint:**
```
GET {{url}}/api/v1/rest/assets/download/210
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

