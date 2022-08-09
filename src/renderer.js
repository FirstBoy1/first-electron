document.addEventListener('DOMContentLoaded', () => {
  const { getUsers } = window.electronAPI
  ;(async () => {
    const users = await getUsers()
    console.log(users)
    document.body.append(JSON.stringify(users, 1, null))
  })()
})
