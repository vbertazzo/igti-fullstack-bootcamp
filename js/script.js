let users = []

window.addEventListener('load', () => {
  const url =
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  fetchUsersFrom(url)
  setupSearch()
})

const fetchUsersFrom = async (url) => {
  loading()
  const res = await fetch(url)
  const json = await res.json()

  users = json.results
    .map((user) => {
      const { name, dob, picture, gender } = user
      return {
        name: `${name.first} ${name.last}`,
        age: dob.age,
        gender,
        picture: picture.large,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  loading(false)
}

const loading = (isLoading = true) => {
  const loader = document.querySelector('.loader')
  const searchInput = document.querySelector('#search-bar')

  const activate = () => {
    searchInput.disabled = true
    loader.innerHTML = `
		<div class="preloader-wrapper small active">
			<div class="spinner-layer spinner-green-only">
				<div class="circle-clipper left">
					<div class="circle"></div>
				</div><div class="gap-patch">
					<div class="circle"></div>
				</div><div class="circle-clipper right">
					<div class="circle"></div>
				</div>
			</div>
		</div>
	`
  }

  const deactivate = () => {
    searchInput.disabled = false
    loader.setAttribute('aria-busy', false)
    loader.innerHTML = ''
  }

  isLoading ? activate() : deactivate()
}

const setupSearch = () => {
  const searchBar = document.querySelector('#search-bar')
  const searchButton = document.querySelector('#search-button')
  searchBar.addEventListener('keyup', handleSearch)
  searchButton.addEventListener('click', handleSearch)
  searchBar.value = ''
  searchBar.focus()
}

const handleSearch = (event) => {
  const { key } = event
  const { value } = document.querySelector('#search-bar')
  const searchButton = document.querySelector('#search-button')

  value.length > 0
    ? searchButton.removeAttribute('disabled')
    : searchButton.setAttribute('disabled', true)

  if (value.length === 0) {
    render(null)
    return
  }

  if (value.length > 0 || key === 'Enter') {
    const result = filterUsersByName(value)
    render(result)
  }
}

const filterUsersByName = (name) => {
  const result = users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  )

  return result
}

const render = (results) => {
  renderStats(results)
  renderUsers(results)
}

const renderStats = (users) => {
  const statsContainer = document.querySelector('.stats')

  if (users === null || users.length === 0) {
    const statsHTML = '<h2 class="stats-header" role="region">Stats</h2>'
    statsContainer.innerHTML = statsHTML
    return
  }

  const numberFormatter = Intl.NumberFormat('en-US')
  const maleCount = users.filter((user) => user.gender === 'male').length
  const femaleCount = users.filter((user) => user.gender === 'female').length
  const ageSum = users.reduce((acc, curr) => acc + curr.age, 0)
  const formattedAgeSum = numberFormatter.format(ageSum)
  const averageAge = (ageSum / users.length).toFixed(2)
  const formattedAveraveAge = numberFormatter.format(averageAge)

  const statsHTML = `
    <h2 class="stats-header" role="region">Stats</h2>
		<p class="stat">Male users: ${maleCount}</p>
		<p class="stat">Female users: ${femaleCount}</p>
		<p class="stat">Sum of ages: ${formattedAgeSum} years</p>
		<p class="stat">Average age: ${formattedAveraveAge} years</p>
	`

  statsContainer.innerHTML = statsHTML
}

const renderUsers = (users) => {
  const createCard = ({ name, age, picture }) => {
    return `
			<figure class="card" role="listitem">
				<div class="card-image">
					<img src="${picture}" alt="${name}'s photo"/>
				</div>
				<div class="card-content">
					<figcaption>${name}, ${age} years</figcaption>
				</div>
			</figure>
		`
  }

  const usersHeader = document.querySelector('.users-header')
  const usersContainer = document.querySelector('.users-list')

  if (users === null || users.length === 0) {
    usersHeader.textContent = 'Results will appear here'
    usersContainer.innerHTML = ''
    return
  }

  usersHeader.textContent = `${users.length} users found`
  let usersHTML = ''

  users.forEach((user) => {
    usersHTML += createCard(user)
  })

  usersContainer.innerHTML = usersHTML
}
