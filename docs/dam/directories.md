# UnoPIM DAM - Directories Endpoints

Comprehensive guide for managing directories via API

---

## GET - Get All Directories

Retrieve a list of all directories in the system.

**Endpoint:**
```
GET {{url}}/api/v1/rest/directories
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## GET - Get Directory by ID

Retrieve a specific directory by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/directories/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## POST - Create a Directory

Create a new directory in the DAM system.

**Endpoint:**
```
POST {{url}}/api/v1/rest/directories
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (Form Data):**
- `name` - Directory name (value: Testing_Directory)
- `parent_id` - Parent directory ID (value: 1)

---

## PUT - Update a Directory

Update an existing directory details such as name and parent directory.

**Endpoint:**
```
PUT {{url}}/api/v1/rest/directories/2
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "Testing Directory",
    "parent_id": 1
}
```

---

## DELETE - Delete a Directory

Delete a directory from the DAM system.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/directories/4
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "Testing Directory",
    "parent_id": 1
}
```
