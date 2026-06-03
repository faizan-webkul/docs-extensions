# Setting Up ERPNext Credentials

Once the connector is installed, the next step is to connect your ERPNext instance to UnoPim. This is done by entering your ERPNext API details inside the UnoPim dashboard.

You can connect **multiple ERPNext sites** by creating a separate set of credentials for each one.

## Step 1 - Open the Credentials Page

Log in to your UnoPim dashboard and navigate to **ERPNext → Credentials**, then click **Add Credential**.

## Step 2 - Enter Your ERPNext Connection Details

Fill in the following fields to establish the connection:

| Field | What to enter |
|---|---|
| **Name** | A unique label for this connection (e.g., `Production ERPNext`). Must be unique across credentials. |
| **Base URL** | The full URL of your ERPNext instance (e.g., `https://your-company.erpnext.com`). |
| **API Key** | The API Key generated for your ERPNext user. |
| **API Secret** | The API Secret generated alongside the API Key. |
| **UnoPim Channel** | The UnoPim channel this credential is scoped to. |
| **UnoPim Locale** | The UnoPim locale used for this connection. |
| **Currency** | The default currency used for this connection. |
| **Active** | Toggle to enable or disable this credential. |

> **Note:** Don't have your API Key and Secret yet? See [ERPNext Setup](./erpnext-setup.md) for how to generate them in ERPNext.

## Step 3 - Test the Connection

Before saving, click **Test Connection**. UnoPim pings your ERPNext instance using the details you entered.

- ✅ **Connection to ERPNext succeeded.** - your details are correct, go ahead and save.
- ❌ **Unable to reach ERPNext** - double-check the Base URL, API Key, and API Secret, then try again.

## Step 4 - Save Your Credentials

Once the test passes, click **Save**. Your ERPNext instance is now connected to UnoPim and ready for export and import jobs.

> **Tip:** When editing an existing credential, leave the **API Secret** field blank to keep the previously saved value.
