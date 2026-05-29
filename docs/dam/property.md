# Unopim DAM - Properties Endpoints

Comprehensive guide for managing properties via API

---

## GET - Get Property by ID

Retrieve a specific property by its ID.

**Endpoint:**
```
GET {{url}}/api/v1/rest/properties/3
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

---

## PATCH - Update Property

Update an existing property with new details.

**Endpoint:**
```
PATCH {{url}}/api/v1/rest/properties/1
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "New Property",
    "value": "This is the New Property",
}
```

**Parameters:**
- `name` - Property name
- `value` - Property value

---

## DELETE - Delete Property

Delete a property from the system.

**Endpoint:**
```
DELETE {{url}}/api/v1/rest/properties/2
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "comments": "Hello Who are you ??"
}
```

---

## POST - Create a Property

Create a new property in the system.

**Endpoint:**
```
POST {{url}}/api/v1/rest/properties/7
```

**Headers:**
```
Accept: application/json
Authorization: Bearer {{token}}
```

**Body (JSON):**
```json
{
    "name": "Description",
    "type": "Text",
    "value": "This image showcases the new winter collection of jackets.",
    "language": "en_US"
}
```

**Parameters:**
- `name` - Property name
- `type` - Property type (value: Text)
- `value` - Property value
- `language` - Language code (value: en_US)

---

