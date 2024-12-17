

interface BetResult {
    win:boolean;
    payout:number;
    winProbability:number;
}


export class CoinFlipGame {
    private initialWinRate: number = 0.65;
    private winRateDecayFactor:number = 0.02;
    private maxGamesBeforeDecay:number = 10;
    private houseEdgeFinal:number = 0.52;

    private calculateWinProbability(userGamesPlayed:number):number {
            if(userGamesPlayed <this.maxGamesBeforeDecay){
                return this.initialWinRate
            }else {
                const decay = Math.min(
                    this.winRateDecayFactor * (userGamesPlayed - this.maxGamesBeforeDecay),
                    this.initialWinRate - this.houseEdgeFinal
                )

                return Math.max(this.houseEdgeFinal,this.initialWinRate -decay)
            }
    }

    simulateBet(betAmount:number,userGamesPlayed:number):BetResult {
        const winProbability = this.calculateWinProbability(userGamesPlayed)
        const isWin = Math.random() < winProbability


        let payout:number;
        if(isWin){
            if(userGamesPlayed < this.maxGamesBeforeDecay){
                payout = betAmount *1.8
            } else {
                const payoutMultiplier = 1 + (0.5 * (1-winProbability))
                payout = betAmount * payoutMultiplier
            }
        }else {
            payout = 0
        }

        return {
            win:isWin,
            payout,
            winProbability
        }
    }


    runSimulation(initialBalance:number,betAmount:number):void {
        let balance = initialBalance
        let userGames = 10

        while(balance < 100000){
            const result = this.simulateBet(betAmount,userGames)

            if(result.win) {
                balance += result.payout
            }else {
                balance -= betAmount
            }

            userGames++

            console.log(
                `Game ${userGames}: ` +
                `Win=${result.win}, ` +
                `Payout=$${result.payout.toFixed(2)}, ` +
                `Win Prob=${(result.winProbability * 100).toFixed(2)}%, ` +
                `Balance=$${balance.toFixed(2)}`
            );

            if(balance <= 0){
                console.log(`Final Balance: ${balance}`)
            }
        }
    }

}

const game = new CoinFlipGame()
game.runSimulation(1000,10)

