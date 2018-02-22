'use strict';

let Router = require('koa-router');

let router = new Router();

let beerController = require('../app/controllers/beer');

router.get('/beer', async (ctx, next) => {
  try {
    ctx.render('beer', {
      title: 'Пиво',
      resData: await beerController.getBeers()
    }, true)
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

module.exports = router;
