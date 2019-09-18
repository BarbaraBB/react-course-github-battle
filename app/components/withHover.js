import React from 'react'

export default function withHover(Component, propName = 'hovering') {
    return class withHover extends React.Component {
        constructor(props){
            super(props)

            this.state = {
                hovering:false,
            }

            this.mouseOver = this.mouseOver.bind(this)
            this.mouseOut = this.mouseOut.bind(this)
        }
        mouseOver(){
            this.setState({
                hovering:true
            })
        }
        mouseOut(){
            this.setState({
                hovering:false
            })
        }
        render(){
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }
            const {hovering} = this.state
            return(
                <div
                    onMouseOver={()=>this.mouseOver()}
                    onMouseOut={()=>this.mouseOut()}>
                    <Component {...props}/>
                </div>
            )
        }
    }
}