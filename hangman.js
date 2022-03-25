/* Assignment on Constructos in Node.js */
/* Programm developed by:Sangeetha Kalia*/

function BasicCard(front,back,ans)
{
  this.front = front;
  this.back = back;
  this.anstxt = ans;
  this.tries = 5;

}

    BasicCard.prototype.displayQuestion  = function()
    {
          var answer = require("inquirer");
          var that = this;

        getitright();

        function getitright()
        {

                if(that.tries > 0)
                {
                        answer.prompt(
                          [
                            {
                              type:"input",
                              message: `${that.front}`,
                              name:"reply"
                            }
                          ]
                        ).then(function(result)
                          {
                             if( result.reply === that.anstxt)
                             {
                               console.log("\nYou got it right....");
                               //return;
                               gl_right++;
                               cont();
                             }
                             else {
                               console.log('\nYou missed it!!!, Number of tries remaining:',that.tries);
                               getitright();
                             }
                          }); // end of callback
                          that.tries--;
                 } //end of if
                 else {
                   cont();
                   gl_wrong++;
                 }
           } // end of getitright
      } //end of displayQuestion()

function ClozeCard (text,cloze,part)
{
       this.fulltext = text;
       this.cloze = cloze;
       this.part = part;

} //Clozecard

ClozeCard.prototype.flashcard = function()
{
    var mybasicI = new BasicCard(this.part,this.text,this.cloze);
    var rightans = (mybasicI.displayQuestion());
 } //end flashcard

/* The First set of tried using Instance creation */
/*
var text = "George Washington is the first President.";
var part = "_________________ is the first President.";
var cloze = "George Washington";
var useCl = new ClozeCard(text,cloze,part);
useCl.flashcard(text,cloze,part);
*/

function cont()
{
  if (gl_counter < 5)
  {
          var cont = require('inquirer');
          cont.prompt(
            [
              {
                type:'confirm',
                message:'Do you wish to continue game :',
                name:'reply'
              }
            ]).then(function(response){
                    if(response.reply)
                    {
                      nxtquestion();
                    }
                    else {
                      console.log('\n\nYou Exited the game');
                      results();
                    }
            });
    } //end of if
    else {
          console.log('\n\nYou finished the game!!!');
          results();
    }
}

//Main Programm
console.log('US Presidents Quiz');
console.log(`Hint: George Washington,Bill Clinton,George W. Bush,Abraham Lincoln,Thomas Jefferson,Barack Obama`);

var gl_text = [
  'George Washington is the first President.',
  'Bill Clinton is the 42nd President.',
  'George W.Bush is the 43rd President',
  'Abraham Lincoln is the 16th President',
  'Thomas Jefferson is the 3rd President',
  'Barack Obama is the 44th President'
];
var gl_part = [
  '________________ is the first President.',
  '_____________ is the 42nd President.',
  '___________________ is the 43rd President',
  '_________________ is the 16th President',
  '______________ is the 3rd President',
  '_________________ is the 44th Presient'
];
var gl_cloze = [
  'George Washington',
  'Bill Clinton',
  'George W. Bush',
  'Abraham Lincoln',
  'Thomas Jefferson',
  'Barack Obama'
];
var gl_counter = -1;
var gl_right = 0;
var gl_wrong = 0 ;
nxtquestion();
// End of Main Programm

function nxtquestion()
{
      gl_counter++;
      if ( gl_counter < 6)
      {
            var txt = gl_text[gl_counter];
            var part = gl_part[gl_counter];
            var cloze = gl_cloze[gl_counter];
            var useCl = new ClozeCard(txt,cloze,part);
            useCl.flashcard();
      }
      else {
          console.log("\n\nYou finished the Game.!!!");
          results();
      }
}

function results()
{
  console.log('\nTotal Questions :',6);
//  console.log('glcounter',gl_counter);
  console.log('Questions attempted',gl_right+gl_wrong);
  console.log('Right :',gl_right);
  console.log('Wrong :',gl_wrong);
}
