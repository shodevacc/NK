import React from 'react'
import insta from './Insta.svg'
import face from './Facebook.svg'
import twitter from './Twitter.svg'

export const Insta=({style})=><img style={style} src={insta}/>
export const Facebook=({style})=><img style={style} src={face}/>
export const Twitter=({style})=><img style={{style}} src={twitter}/>