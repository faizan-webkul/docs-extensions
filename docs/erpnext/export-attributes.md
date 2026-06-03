# UnoPim - Export Attributes to ERPNext

Exporting UnoPim attributes and their options to ERPNext as **Item Attributes**.

## Overview

This export job pushes all UnoPim attributes - along with their selectable options - into ERPNext as **Item Attribute** records. Run it before exporting products so variant attributes already exist on the ERPNext side.

The job type is listed as **ERPNext: Attributes → Item Attribute**.

## Prerequisites

Before exporting, make sure you have [set up your ERPNext credentials](./setup-credentials.md) in UnoPim.

## How to Export Attributes

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Exports

Click on **Exports** to view the available export jobs.

### Step 3: Create Export

Click **Create Export**, then enter a unique **Code** and **Label** for the job.

### Step 4: Select Type

Select **ERPNext: Attributes → Item Attribute** as the export type.

### Step 5: Choose the Credential

In the job filters, select the **ERPNext Credential** that points to the site you want to export to.

### Step 6: Save

Click **Save** to store the export job.

### Step 7: Export Now

Click **Export Now** to run the job and push your attributes to ERPNext.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

