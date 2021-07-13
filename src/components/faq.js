import React, { Component } from "react";

const faqData = [
  {
    qn: "What is provably fair on-chain gambling?",
    ans: [
      "Simply put, provably fair means that any bet outcome can be independently verified and that the operator or other players have no means of tampering with the result.",
    ],
  },
  {
    qn: "Is DicBNB Provably Fair?",
    ans: [
      "Yes. the whole gameplay is controlled by ethereum smart contract that computes random numbers based on operator inputs and blockchain data (block hashes). any party can audit the contract as well as inspect any transaction to make sure that neither DicBNB nor malicious players are influencing the results.",
    ],
  },
  {
    qn: "How are you different from the other gambling sites?",
    ans: [
      "Placing a bet on DicBNB has much lower transaction fee compared to competing websites − this allows supporting bets as low as 0.01 ETH. Our games are very simple & easily understandable, just like tossing a coin or rolling a dice.",
      "And, of course, we have jackpot!",
    ],
  },
  {
    qn: "Is there any catch? Explain how it works like I'm five.",
    ans: [
      "This is where we have to get a bit technical:",
      [
        "DicBNB picks a secret random number and provides you with its hash.",
        "You send your bet in Ethereum transaction to our smart contract along with the hash from previous step.",
        "At this point DicBNB has already committed to a number, prior to you choosing an outcome.",
        "Once your transaction is confirmed by the network, the contract stores the hash and bet details.",
        'Our croupier bot "reveals" the number by sending a bet settling transaction.',
        "The contract accepts the transaction if and only if the hash of provided number is the same as the stored one.",
        "The contract mixes the number and block hash of the bet transaction to get a random number.",
        "The contract decides whether you won or lost and sends you the winning amount of Ether.",
      ],
      'Can DicBNB tamper with the results? Nope, as the contract keeps track of secret number\'s hash, meaning the operator cannot change the number after the bet has been accepted. Mixing the block hash with the numbers makes the result totally random yet disallows miners from crafting winning bets. On the other hand, DicBNB themselves cannot control bet outcomes either because of block hash component. This is a well-known "commitment scheme" which enables DicBNB to provide gambling-grade random number generation allowing for big bets, jackpots and quick settlements while being fully transparent.',
    ],
  },
  {
    qn: "What if I want to really verify that everything you say is actually true?",
    ans: [
      "Feel free to study our Smart Contract - it's available on Github. In case you have any questions or hesitations, drop us a line via Telegram, Twitter or e-mail.",
    ],
  },
  {
    qn: "What are the fees?",
    ans: [
      "Every bet is deducted 1% (but no less than 0.0003 ETH) in favour of the DicBNB (to help us pay the bills and keep the game running) and 0.001 ETH more gets accumulated in the jackpot for bets of 0.1 ETH and up (which also makes these bets participate in jackpot!)",
    ],
  },
];
const Faq = () => {
  return (
    <div className="faq">
      {faqData.map((i, k) => (
        <div className="faq-block">
          <div className="qn">{i.qn}</div>
          <div className="ans">
            {i.ans.map((m, n) =>
              Array.isArray(m) ? (
                <div className="ans-arr">
                  {m.map((x, y) => (
                    <div>
                      <div className="faq-dot"></div>
                      {x}
                    </div>
                  ))}
                </div>
              ) : (
                <div> {m}</div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
