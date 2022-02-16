module.exports = async function (test,assert) {

  test('Event passed to child is recieved', async ctx =>{

    await ctx.page.click('#test3_child_btn');
    
    assert.is( 
      await ctx.page.innerText('#test3_child_message'),
      'Event bubbling child OK'
    );
  });

  test('Event passed to child is not bubbled to parent, when recieved in child', async ctx =>{
    
    assert.is.not( 
      await ctx.page.innerText('#test3_parent_message'),
      'Event bubbling child FAIL'
    );
  });

  test('Event passed to parent is bubbled to parent, when not recieved in child', async ctx =>{
    await ctx.page.click('#test3_parent_btn');
    assert.is( 
      await ctx.page.innerText('#test3_parent_message'),
      'Event bubbling parent OK'
    );
  });

  

}