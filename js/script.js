let users = []

window.addEventListener('load', async () => {
  const url =
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
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
}
