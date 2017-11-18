export const filterByName = (array = [], name = '') => name === '' 
  ? array
  : array.filter(each => each.firstName === name || each.lastName === name)
  
export const filterByMajor = (array = [], major = 'all') => major === 'all'
  ? array
  : array.filter(each => each.major === major)

export const capitalize = (string = '') => string[0].toUpperCase() + string.slice(1)

export const fetchAnnouncers = async () => {
  const response = await fetch('https://ywc15.ywc.in.th/api/interview')
  return response.json()
}