import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Recipe(props) {
  const classes = useStyles();
  const history = useHistory();
  const { recipe } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        title={recipe.recipename}
        subheader={recipe.cheffname}
        action={
          <IconButton
            aria-label="Edit"
            onClick={() => {
              history.push({
                pathname: '/newRecipe',
                state: { recipe: recipe, isEditing: true },
              });
            }}>
            <EditIcon />
          </IconButton>
        }
      />
      <CardMedia
        component="div"
        className={classes.media}
        image={recipe.picture}
        title={recipe.recipename}
        onClick={() => {
          history.push({
            pathname: '/showRecipe',
            state: { recipe: recipe },
          });
        }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.preparation}
        </Typography>
      </CardContent>
    </Card>
  );
}
