export const majors = {
    'content': {
        major: 'content',
        color: 'navy',
        hover: 'hover-white bg-animate hover-bg-navy',
        textColor: 'white'
    },
    'design': {
        major: 'design',
        color: 'yellow',
        hover: 'hover-white bg-animate hover-bg-yellow',
        textColor: 'black'
    },
    'marketing': {
        major: 'marketing',
        color: 'dark-red',
        hover: 'hover-white bg-animate hover-bg-dark-red',
        textColor: 'white'
    },
    'programming': {
        major: 'programming',
        color: 'dark-green',
        hover: 'hover-white bg-animate hover-bg-dark-green',
        textColor: 'white'
    }
}

export const initialState = {
    isNavbarDisplay: false,
    isFloatButtonDisplay: false,
    major: 'all',
    interviewees: [],
    showedInterviewees: [],
    queryName: ''
}