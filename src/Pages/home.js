import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Item from '../components/Item';
import Card from '../components/Card';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '5px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center'
    },
  }));

const HomePage = () => {

    const [categoryFilter, setCategoryFilter] = useState('');
    const products = useSelector(state => state.products)
    const classes = useStyles();

    const categorys = products.map(
        category => {
            const container = { };
            container['id'] = category.id_categorys;
            container['name'] = category.name_categorys;
            return container;
        }
    )

    const category = categorys.map(JSON.stringify)
                    .filter(function(item, index, arr){
                        return arr.indexOf(item, index + 1) === -1;
                    })
                    .map(JSON.parse)

    const arrayCategory = categorys.map(category => category.name)
    let count = { };

    for(let i = 0; i < arrayCategory.length; i++){
        {
            let key = arrayCategory[i];
            count[key] = (count[key] ? count[key] + 1 : 1)
        }
    }

    return(
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>
                        <span
                            title='mostrar todas as categorias'
                            onClick={() => {setCategoryFilter('')}}>
                                Categorias
                        </span>
                    </Typography>
                    <List>
                        {category.map(
                            category => {
                                return (
                                    <div style={{cursor: 'pointer'}} onClick={() => {setCategoryFilter(category.name)}}>
                                        <Item
                                            key = {category.id} 
                                            name= {category.name}
                                            details={count[category.name]}
                                        />
                                    </div>
                                )
                            }
                        )}
                    </List>
                </Paper>
            </Grid>
            <Grid container xs={9} spacing={3} className={classes.root}>
                {products.map(item => {
                    return(
                        (categoryFilter === '' || (item.name_categorys.toLowerCase() === categoryFilter.toLowerCase()))
                            ?  <Card key={item.id_product} product={item} >
                                    {item.name_product}
                                </Card>
                            : <></>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default HomePage;
