# UnoPim - Export Categories to ERPNext

Exporting UnoPim categories to ERPNext as **Item Groups**.

## Overview

This export job pushes your UnoPim categories into ERPNext as **Item Group** records. Because products resolve their ERPNext Item Group from their first category, it's a good idea to run this job before exporting products.

The job type is listed as **ERPNext: Categories → Item Group**.

## Prerequisites

Before exporting, make sure you have [set up your ERPNext credentials](./setup-credentials.md) in UnoPim.

## How to Export Categories

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Exports

Click on **Exports** to view the available export jobs.

### Step 3: Create Export

Click **Create Export**, then enter a unique **Code** and **Label** for the job.

### Step 4: Select Type

Select **ERPNext: Categories → Item Group** as the export type.

### Step 5: Choose the Credential

In the job filters, select the **ERPNext Credential** that points to the site you want to export to.

### Step 6: Save

Click **Save** to store the export job.

### Step 7: Export Now

Click **Export Now** to run the job and push your categories to ERPNext.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

