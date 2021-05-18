import React, { Component } from 'react';
class MemeGenerator extends Component {
    constructor(){
        super();
        this.state={
            topText:'',
            bottomText:'',
            randomImg:'',
            memeImg: [],
            isLoading:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({memeImg: memes})
            })
    }
    handleChange(e){
        const {name,value} = e.target
        this.setState({isLoading:true})
        this.setState({[name]:value, isLoading:false})
    }
    handleSubmit(e){
        e.preventDefault();
        const rand = Math.floor(Math.random() * this.state.memeImg.length)
        const randImg = this.state.memeImg[rand].url
        this.setState({randomImg:randImg})
    }
    render() { 
        return ( 
            <div>
                <form className='myForm' onSubmit={this.handleSubmit}>
                    <input type='text' name='topText' value={this.state.topText} placeholder='Top Text' onChange={this.handleChange}/><br/>
                    <input type='text' name='bottomText' value={this.state.bottomText} placeholder='Bottom Text' onChange={this.handleChange}/><br/>
                    <button>Generate</button>
                </form>
                {this.state.isLoading? <h1>Loading...</h1> : 
                <div className='meme'>
                    <img src={this.state.randomImg} alt='meme'/>
                    <h2>{this.state.topText}</h2>
                    <h2>{this.state.bottomText}</h2>
                </div>}
            </div>
         );
    }
}
 
export default MemeGenerator;