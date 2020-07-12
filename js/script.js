let users = []

window.addEventListener('load', async () => {
  const url =
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  setupSearch()
  fetchUsersFrom(url)
})

const fetchUsersFrom = async (url) => {
  displayLoading()
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

  displayLoading(false)
}

const displayLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader')

  const showLoader = () => {
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

  const hideLoader = () => {
    loader.innerHTML = ''
  }

  isLoading ? showLoader() : hideLoader()
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
    const statsHTML = '<h2 class="users-header">Nada a ser exibido</h2>'
    statsContainer.innerHTML = statsHTML
    return
  }

  const maleCount = users.filter((user) => user.gender === 'male').length
  const femaleCount = users.filter((user) => user.gender === 'female').length
  const ageSum = users.reduce((acc, curr) => acc + curr.age, 0)
  const averageAge = (ageSum / users.length).toFixed(2)

  const statsHTML = `
		<h2 class="stats-header">Estatísticas</h2>
		<p class="stat">Sexo masculino: ${maleCount}</p>
		<p class="stat">Sexo feminino: ${femaleCount}</p>
		<p class="stat">Soma das idades: ${ageSum} anos</p>
		<p class="stat">Média das idades: ${averageAge} anos</p>
	`

  statsContainer.innerHTML = statsHTML
}

const renderUsers = (users) => {
  const createCard = ({ name, age, picture }) => {
    return `
			<div class="card">
				<div class="card-image">
					<img src="${picture}" alt="${name}'s photo"/>
				</div>
				<div class="card-content">
					<p>${name}, ${age} anos</p>
				</div>
			</div>
		`
  }

  const usersHeader = document.querySelector('.users-header')
  const usersContainer = document.querySelector('.users-list')

  if (users === null || users.length === 0) {
    usersHeader.textContent = 'Nenhum usuário filtrado'
    usersContainer.innerHTML = ''
    return
  }

  usersHeader.textContent = `${users.length} pessoa(s) encontrada(s)`
  let usersHTML = ''

  users.forEach((user) => {
    usersHTML += createCard(user)
  })

  usersContainer.innerHTML = usersHTML
}
