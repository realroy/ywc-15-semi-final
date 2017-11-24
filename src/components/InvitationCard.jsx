import React from 'react'

import {fetchInterviewee} from '../utils'
import {majors} from '../configs'
import closeIcon from '../imgs/close.svg'

export default class InvitationCard extends React.Component {

  state = {
    interviewRef: '',
    major: '',
    name: ''
  }

  async componentDidMount() {
    const interviewRef = this.props.match.params.interviewRef
    const interviewees = await fetchInterviewee()
    const {major, firstName, lastName} = interviewees.find(interviewee => interviewee.interviewRef === interviewRef)
    const name = `${firstName} ${lastName}`
    this.setState(prevState => Object.assign({}, prevState, {interviewRef, major, name}))
    const title = `${interviewRef} ${name} WEB ${major.toUpperCase()}@YWC#15`
    document.title = title
    const metaTags = [
      `https://oroy-ywc15-semi-final.herokuapp.com${this.props.match.url}`,
      title,
    ]
    document.head.children[5].content = metaTags[0]
    document.head.children[7].content = metaTags[1]
  }
  handleClick = e => this.props.history.push('/')

  render() {
    const { interviewRef, major, name } = this.state
    const css = majors[major] ? { color: majors[major].color, textColor: majors[major].textColor } : ''
    return (
      <div
        id="modal-box"
        className={`fixed dt h-100 w-100 tc bg-${css.color} ${css.textColor}`}>
        <button
          onClick={this.handleClick}
          className="button-reset bn absolute pointer mh2 mt2 h2 w2 br-100 dim bg-white">
          <img src={closeIcon} alt="close-btn"/>
        </button>
        <div className="dtc v-mid">
          <div className={`mh1 mh6-ns pv3 pv6-ns ba b--${css.textColor} br1`}>
            <header >
              <h2 className="f6 ttu tracked mb2 lh-title fw9">{interviewRef}</h2>
            </header>                                                                                                                                                 
            <h1 className="f3 f1-ns f-headline-l fw1 i">{name}</h1>
            <hr className={`bb br3 w-60 w-80-ns b--${css.textColor}`}/>
            <blockquote className="ph0 mt4 mh0 measure f4 lh-copy center">
              <cite className="f6 ttu tracked fs-normal fw9 ">WEB {major ? major.toUpperCase() : ''}
                @ Young Webmaster Camp #15</cite>
            </blockquote>
            <div
              className="fb-share-button"
              data-href={`https://oroy-ywc15-semi-final.herokuapp.com${this.props.match.url}`}
              data-layout="button_count"
              data-size="large"
              data-mobile-iframe="true">
              <a
                className="fb-xfbml-parse-ignore"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foroy-ywc15-semi-final.herokuapp.com%2Finvitation-card%2F${interviewRef}&amp;src=sdkpreparse`}>
                Share
              </a>
            </div>
          </div>
        </div>

      </div>
    )

  }
}
