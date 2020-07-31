import React, { Component } from 'react';
import Modal from '../../components/Ul/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrapperComponet, axios) => {
    return class extends Component{
        state = {
            error :null
        }

        UNSAFE_componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req
            });
          
            this.resInterceptor =  axios.interceptors.response.use(res => res, (error) => {
				this.setState({ error: error });
			});
         }
            
         componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

        }

         errorConfirmHandler = ()=>{
            this.setState({error:null})
            console.log('hello')
        }

        render() {
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                     modalClosed={this.errorConfirmHandler}>
                     { this.state.error ? this.state.error.message : null}
              
                    
                   </Modal>
                  <WrapperComponet {...this.props}/>               
                </Aux>
            );
        }
    } 
}
export default withErrorHandler;

