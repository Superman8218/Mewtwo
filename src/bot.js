/**
 * Mewtwo
 *
 */
const { MOVE, SWITCH } = require('leftovers-again/src/decisions');

/**
 * Your code is pre-built with a very simple bot that chooses a team, then
 * picks randomly from valid moves on its turn.
 */
class Mewtwo {

  team() {

	var test = '';
	var text = 'test';

	const { spawn } = require('child_process');
	const child = spawn('python', ["pythoncode.py"]);

	child.stdout.on('data', function (data){
		test = data;
		console.log(text);
		console.log(data);
	});

	if (test != '')
	{
		return `
		Aerodactyl @ Focus Sash
		Ability: Pressure
		EVs: 252 Atk / 4 SpD / 252 Spe
		Jolly Nature
		- Taunt
		- Stealth Rock
		- Tailwind
		- Double edge`
	}

	else {

    return `
Aerodactyl @ Focus Sash
Ability: Pressure
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Taunt
- Stealth Rock
- Tailwind
- Double edge

Dragonite @ Choice Band
Ability: Multiscale
EVs: 252 Atk / 4 SpD / 252 Spe
Adamant Nature
- Outrage
- Extreme Speed
- Superpower
- Fire Punch

Staraptor @ Flyinium Z
Ability: Intimidate
EVs: 4 HP / 252 Atk / 252 Spe
Jolly Nature
- Mirror Move
- Brave Bird
- Close Combat
- Quick Attack

Landorus-Therian @ Choice Scarf
Ability: Intimidate
EVs: 252 Atk / 4 Def / 252 Spe
Adamant Nature
- Earthquake
- U-turn
- Stone Edge
- Knock Off

Celesteela @ Leftovers
Ability: Beast Boost
EVs: 252 HP / 252 Def / 4 SpD
Impish Nature
- Leech Seed
- Toxic
- Heavy Slam
- Protect

Zapdos @ Leftovers
Ability: Pressure
EVs: 252 HP / 240 Def / 16 Spe
Bold Nature
- Discharge
- Roost
- Heat Wave
- Defog`;
  }
  }

  /**
   * Here's the main loop of your bot. `state` contains everything about the
   * current state of the game. Please read the documentation for more
   * details.
   *
   * @param  {Object} state The current state of the game.
   *
   * @return {Decision}     A decision object.
   */
  decide(state) { 
    // you're probably gonna turn this on. alternately, use the flag --loglevel=5
    // console.log(state);

    // `teamPreview` means the game hasn't started and you're choosing who to
    // send out first. 
    // `forceSwitch` occurs if your Pokemon has just fainted, or other moves
    // that mean you need to switch out your Pokemon
    if ( state.teamPreview || state.forceSwitch) {
      const myMon = this.pickOne(
        // filter through your reserve of Pokemon for ones that aren't dead
        state.self.reserve.filter( mon => !mon.active && !mon.dead )
      );
      // return a Decision object. SWITCH takes Pokemon objects, Pokemon names,
      // and the reserve index [0-5] of the Pokemon you're switching into.
      return new SWITCH(myMon);
    }

    const myMove = this.pickOne(
      // filter through your active Pokemon's moves for a move that isn't disabled
      state.self.active.moves.filter( move => !move.disabled )
    );
    // return a Decision object. MOVE takes Move objects, move names, and
    // move indexes [0-3].
    return new MOVE(myMove);
  }

  // randomly chooses an element from an array
  pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}


module.exports = Mewtwo;
