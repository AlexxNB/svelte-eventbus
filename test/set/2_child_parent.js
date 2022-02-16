module.exports = async function (test,assert) {

  test('Event passed from deep child to parent', async ctx =>{

      await ctx.page.click('#test2_btn');
      
      assert.is( 
          await ctx.page.innerText('#test2_message'),
          'Deep Child to Parent OK'
      );
  }

)}