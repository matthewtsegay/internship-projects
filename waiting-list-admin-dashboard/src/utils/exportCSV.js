export function exportCSV(data) {
    const csv = [
      ['Name', 'Email', 'Source', 'Date'],
      ...data.map(u => [u.name, u.email, u.source, u.date])
    ]
      .map(row => row.join(','))
      .join('\n')
  
    const blob = new Blob([csv], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'users.csv'
    link.click()
  }
  