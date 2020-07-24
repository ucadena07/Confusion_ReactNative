import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Modal} from 'react-native';
import { Card, Icon, Rating, Input, Button  } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from "../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment: (dishId, rating, comment, author) =>
    dispatch(addComment(dishId, rating, comment, author)),
    postComment: (dishId, rating, comment, author) =>
    dispatch(postComment(dishId, rating, comment, author))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                    
                        <View style={{flexDirection:'row', justifyContent: 'center'}}>
                            <Icon 
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('already favorite') : props.onPress()}
                                />
                            <Icon 
                                raised
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => props.toggleModal()}
                            />
                        </View>
                    
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date }</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: "",
            comment: "",
            showModal: false
        };
        this.handleComments = this.handleComments.bind(this);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
      }

    resetForm() {
      this.setState({
          showModal: false
      });
    }

    handleComments = dishId => {
        this.toggleModal();
        this.props.postComment(
            dishId,
            this.state.rating,
            this.state.comment,
            this.state.author
        );
        
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>

                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal
                 animationType={'slide'}
                 transparent={false}
                 visible={this.state.showModal}
                //  onDismiss={() => this.toggleModal()}
                //  onRequestClose={() => this.toggleModal()}
                 >
                
                <Card>
                   
                     <View style={styles.modal}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={60}
                                showRating
                                onFinishRating={rating => this.setState({ rating: rating})} />
                            
                            <Input
                                style={styles.formRow}
                                placeholder=" Author"
                                leftIcon={{ type: "font-awesome", name: 'user-o'}}
                                onChangeText={author => this.setState({ author: author})}/>
                                
                            <Input
                                style={styles.formRow}
                                placeholder=" Comment"
                                leftIcon={{ type: "font-awesome", name: 'comment-o'}}
                                onChangeText={comment => this.setState({ comment: comment})}/>
                           
                            <Button style={{margin: 10}}
                            onPress={() => this.handleComments(dishId)}
                            color='#512DA8'
                            title="SUBMIT" />

                            <Button  style={{margin: 10}}
                            onPress={() => this.toggleModal()}
                            color="#B0B0B0"
                            title="CANCEL" />                

                     </View>
                </Card>

                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow:{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20 
    },
    formLabel: {
      fontSize: 18,
      flex: 2
    },
    formItem: {
      flex: 1
    },
    modal: {
      justifyContent: 'center',
      margin: 20
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#512DA8',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20
    },
    modalText: {
      fontSize: 18,
      margin: 10,
    },
    
  });


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);