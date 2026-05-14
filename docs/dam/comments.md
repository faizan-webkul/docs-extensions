# Unopim DAM - Comments Endpoints

Comprehensive guide for managing comments via API

---

## POST - Create a Comment

Create a new comment on a digital asset.

**Endpoint:**
```
POST {{url}}/api/v1/rest/comments
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "comments": "New more varients of this proudct",
    "dam_asset_id": 4
}
```

**Parameters:**
- `comments` - Comment text content
- `dam_asset_id` - ID of the asset to comment on (value: 4)

---

## GET - Get Comment by ID

Retrieve a specific comment by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/comments/3
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## DELETE - Delete Comment

Delete a comment from an asset.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/comments/2
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

