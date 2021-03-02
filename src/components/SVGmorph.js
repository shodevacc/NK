import React, { useState, useEffect } from "react"
import { interpolate } from "flubber"
import { useSpring, animated,config } from "react-spring"

function SVGmorph({ paths, time, fill }) {
  var initialState = {
    paths: paths,
    index: 0,
  }
  const [state, setstate] = useState(initialState)
  //Make custom ineterpolation b/w svg paths
  const interpolator = interpolate(
    state.paths[state.index], //From
    state.paths[state.index + 1] || state.paths[0], //To
    { maxSegmentLength: 0.1 }
  )
  const goNext = () => {
    setstate(state => {
      return {
        ...state,
        index: (state.index + 1) % state.paths.length,
      }
    })
  }
  //React spring animation
  const props = useSpring({
    from: { x: 0 },
    //Interpolation only works when x:1
    to: { x: 1 },
    config:config.molasses,
    //On rest of one animation, increment the state index value so component refreshes and new interpolation animation is executed
    reset: true, //Reset animation
  })

  useEffect(() => {
    const timer = setInterval(goNext, time || 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <React.Fragment>
      <svg  height="512" viewBox="0 0 512 512">
        <animated.path
          d={props.x.interpolate(interpolator)}
          //   fill={fill || "#C4C4C4"}
        ></animated.path>
      </svg>
    </React.Fragment>
  )
}

export default SVGmorph
