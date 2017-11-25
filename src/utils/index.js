import { initialState } from '../configs'

export const filterByNameAndInterviewRef = (array = [], query = initialState.queryName) => {
  query = query.trim()
  const splitedQuery = query.split(' ')
  if(query === initialState.queryName)
    return array
  if(splitedQuery.length === 2)
    return array.filter(each => each.firstName.includes(splitedQuery[0]) && each.lastName.includes(splitedQuery[1]))
  if(splitedQuery.length === 1)
    return array.filter(
      each => (
        each.firstName.includes(query)
        || each.lastName.includes(query)
        || each.interviewRef.includes(query)
        || each.interviewRef.includes(query.toUpperCase())
      ))
}
  
export const filterByMajor = (array = [], major = 'all') => major === 'all'
  ? array
  : array.filter(each => each.major === major)

export const capitalize = (string = '') => string[0].toUpperCase() + string.slice(1)

export const fetchInterviewee = async () => {
  const response = await fetch('https://ywc15.ywc.in.th/api/interview')
  return response.json()
}

export const shouldShowFloatingBtn = () => window.scrollY !== 0

export const shouldShowNavbar = () => window.scrollY >= 500 || window.screen.width < 768