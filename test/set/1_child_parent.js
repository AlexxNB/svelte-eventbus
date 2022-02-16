module.exports = async function (test,assert) {

  test('Event passed from child to parent', async ctx =>{

      await ctx.page.click('#test1_btn');
      
      assert.is( 
          await ctx.page.innerText('#test1_message'),
          'Child to Parent OK'
      );
  }

)}