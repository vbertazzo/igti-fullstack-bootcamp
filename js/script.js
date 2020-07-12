let users = []

window.addEventListener('load', async () => {
  const url =
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  setupSearch()
  fetchUsersFrom(url)
})

const fetchUsersFrom = async (url) => {
  const res = await fetch(url)
  const json = await res.json()

  users = json.results.map((user) => {
    const { name, dob, picture, gender } = user
    return {
      name: `${name.first} ${name.last}`,
      age: dob.age,
      gender,
      picture: picture.thumbnail,
    }
  })
  console.log(users)
}

const setupSearch = () => {
  const searchBar = document.querySelector('#search-bar')
  const searchButton = document.querySelector('#search-button')
  searchBar.addEventListener('keyup', handleSearch)
  searchButton.addEventListener('click', handleSearch)
  searchBar.value = ''
}

const handleSearch = (event) => {
  const { key } = event
  const { value } = document.querySelector('#search-bar')
  const searchButton = document.querySelector('#search-button')

  value.length > 0
    ? searchButton.removeAttribute('disabled')
    : searchButton.setAttribute('disabled', true)

  if (value.length > 0 || key === 'Enter') {
    filterUsersByName(value)
  }
}

const filterUsersByName = (name) => {
  const result = users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  )

  return result
}
