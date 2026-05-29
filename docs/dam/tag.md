# Unopim DAM - Tags Endpoints

Comprehensive guide for managing tags via API

---

## GET - Get Tag by ID

Retrieve a specific tag by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/tags/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## POST - Create a Tag

Create a new tag for a digital asset.

**Endpoint:**
```
POST {{url}}/api/v1/rest/tags
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "tag": "Test",
    "asset_id": 9
}
```

**Parameters:**
- `tag` - Tag name (value: Test)
- `asset_id` - Asset ID to attach the tag (value: 9)

---

## DELETE - Remove a Tag

Delete a tag from an asset.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/tags
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "tag": "Test",
    "asset_id": 9
}
```

**Parameters:**
- `tag` - Tag name (value: Test)
- `asset_id` - Asset ID (value: 9)



