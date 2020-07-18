import React, { Component } from 'react';
import Modal from '../../components/Ul/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrapperComponet, axios) => {
    return class extends Component{
        state = {
            error :null,
        }

        componentWillMount () {
            axios.interceptors.request.use(req=>{
                  this.setState({error: null});
                  return req
            })

            axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
                console.log(error)

             })
         }
            
            errorConfimeHandler = ()=>{
                this.setState({error : null})
            
            }

        render() {

            return (
                <Aux>
                    <Modal 
                     show={this.state.error}
                     modalClosed={this.errorConfimeHandle}>
                     { this.state.error ? this.state.error.message : null}
              
                    
                   </Modal>
                  <WrapperComponet {...this.props}/>               
                </Aux>
            );
        }
    } 
}
export default withErrorHandler;