

# TenaMart Waiting List Admin Dashboard

A Vue 3 + vite admin dashboard to manage users on the TenaMart waiting list.

## Features

* User cards with name, email, and signup source
* Search and filter by signup source
* Pagination or infinite scroll
* Export data as CSV
* Delete or block users with confirmation
* Responsive design matching TenaMart’s theme
* Chart to visualize signups by source or date

## Tech Stack

* Vue 3 
* Tailwind CSS
* JavaScript for CSV export

```bash
git clone https://github.com/matthewtsegay/Waiting_list_admin_dashboard
cd Waiting_list_admin_dashboard
npm install
npm run dev
```

## Structure

* `src/components/`: UI components (UserCard, SearchBar, etc.)
* `src/views/Dashboard.vue`: Main dashboard view
* `src/mockData.js`: Mock user data

## Notes

* Uses mock data (customizable)
* CSV export supported via a simple utility function
* Styled to match the official TenaMart waiting list page

---

