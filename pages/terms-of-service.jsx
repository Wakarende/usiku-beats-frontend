"use client";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import useClickSound from "../hooks/useClickSound";
import "./pages.css";

export default function TermsOfService() {
  const handleClickSound = useClickSound();
  const router = useRouter();

  const handleBack = () => {
    handleClickSound();
    router.push("/");
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden min-h-screen">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={handleBack}
          className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="./assets/img/hub/button_blank.png"
            width={1}
            height={1}
            alt="back-btn"
            className="w-full h-full"
            priority={true}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg uppercase">
            Back
          </span>
        </motion.button>
      </div>

      {/* Terms of Service Content */}
      <div className="relative z-20 pt-20 pb-12">
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="landing-section-title text-5xl md:text-6xl mb-12 text-white text-center">
              Terms Of Service
            </h1>

            <div className="landing-section-content text-white space-y-8">
              {/* Introduction */}
              <div>
                <p>
                  Usiku Games (herein after referred to as the "the Company") is a trading name of
                  Usiku Entertainment Limited, a company registered under the laws of Kenya whose
                  registered address is: PO box 3222, Village market, Nairobi, Kenya, 00621
                </p>
                <p className="mt-4">
                  This agreement establishes the Terms and Conditions that will govern the
                  contractual relationship between the Company and you as a Registering
                  /Participating Player with the company. The Terms shall apply to gaming via all
                  media/electronic platforms including but not limited to mobile devices, computers
                  and laptops. You are required to accept these Terms and Conditions when
                  registering for an account with the Company and you are bound by these Terms and
                  Conditions throughout the existence of the relationship. The company reserves the
                  right to decline your registration/ participation without being bound to provide
                  any reasons whatsoever at any time.
                </p>
                <p className="mt-4">
                  These Terms and Conditions are categorized for ease of reference and
                  understanding. It is important that you make yourself aware of these Terms and
                  Conditions as a participating player. Reference to "you", "your", the "player",
                  "customers", or "subscriber" is reference to any person using the Company gaming
                  platform or the services and/or any registered customer of the Company thereof.
                  Reference to "the Company", "us", "Our" "we" is reference to Usiku Entertainment
                  Limited, www.Usiku.Games and/or its successors in title and assigns.
                </p>
                <p className="mt-4">
                  The Company reserves the right to change these Terms and Conditions at any time
                  and without prior notice. The Company will endeavor to inform you about major
                  modifications to the Terms and Conditions. Nevertheless, it is your responsibility
                  to regularly check for any changes. Should you, due to any possible changes, not
                  wish to continue using the services of the Company, you can withdraw uncommitted
                  funds without penalty and close the account by sending email to:{" "}
                  <a
                    href="mailto:support@Usiku.Games"
                    className="text-orange-500 hover:text-orange-400 underline"
                  >
                    support@Usiku.Games
                  </a>
                  , to that effect. A response will be sent to you confirming receipt of your
                  decision to discontinue your engagement with the Company. Failure by you to
                  receive a message for any reason whatsoever shall not be taken to mean that the
                  Company has any continued obligation towards you from the date of your withdrawal.
                </p>
                <p className="mt-4">
                  The Company will respect your privacy in line with the Company's privacy policy
                  and will endeavor to at all times preserve your information in the strictest
                  confidence as it possibly can. The Company shall not be liable for any loss of
                  data by itself or by other contracted independent service providers on whom the
                  Company will wholly or partially be reliant on to deliver the services.
                </p>
                <p className="mt-4">
                  The Company will not disclose your personal information to third parties unless
                  such disclosure:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>is required for the processing of your requests;</li>
                  <li>is a duty and/or legal obligation of the company;</li>
                  <li>
                    is required to enforce/ apply the Terms and Conditions and other agreements;
                  </li>
                  <li>
                    is required to adequately protect our rights or property, including via the
                    exchange of information with other companies and organizations for the purposes
                    of information verification, fraud protection and credit risk reduction.
                    Personal information that you provide may be disclosed to a credit reference
                    agency, which may keep a record of the information.
                  </li>
                </ul>
                <p className="mt-4">
                  The contractual relationship between you and the Company is governed by these
                  Terms and Conditions and by the relevant and applicable Laws of Kenya, Kenya being
                  the operational jurisdiction of the Company and its service/products where they
                  will be offered directly to all its duly registered players and /or through its
                  service providers and intermediaries.
                </p>
                <p className="mt-4">
                  By agreeing to these Terms and Conditions and where you play any game, you accept
                  and agree to be bound by these terms and conditions and any amendment or variation
                  thereto and the Rules which apply to the applicable products available from time
                  to time. You are acknowledging that the company shall retain the right to use from
                  time to time, all data collected to carry out market survey/ campaign /research,
                  send customer satisfaction questionnaires, market and promote its services and
                  those of its affiliated companies.
                </p>
                <p className="mt-4">
                  The Company is not responsible for any consequences resulting from major incidents
                  such as any strike, terrorist activities, political crisis, war, natural
                  catastrophe and saturation of the telecommunication networks, cyber-attacks,
                  hacking etc., which could lead to a total or partial access reduction to its
                  services, loss of data by itself or by other contracted independent service
                  providers on whom the Company will wholly or partially be reliant on to deliver
                  the services.
                </p>
              </div>

              {/* ACCOUNT RULES */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">ACCOUNT RULES</h2>
                <p>
                  To apply for an account you must be of legal age and register personally. You must
                  provide your age in the provided fields and confirm the same in the registration
                  field. The Company reserves the right to ask for proof of age from any customer
                  and suspend their account until satisfactory documentation is provided. The player
                  will be provided the opportunity to create a fictitious 'player name' to use
                  during the games, however the player's actual legal name as well. The legal name
                  of the player provided MUST be the same as the name used when registering with the
                  company and must correspond with the registered mobile number. Where this is not
                  the case, the relevant account will be suspended. Where an account is suspended,
                  the relevant customer should Contact Us. All games that are started prior to an
                  account being suspended will be forfeited and suspended. Should any underage
                  account owner be discovered at any point during the lifetime of the account, the
                  account will immediately be closed indefinitely and all funds deposited to the
                  account will be forfeited. In any such suspected circumstance, the Company will
                  report the activity to the appropriate authority and the player may suffer the
                  consequences thereto. You agree to provide all such information as we require in
                  connection with such verification checks. We shall be entitled to suspend or
                  restrict your account in any manner that we may deem in our absolute discretion to
                  be appropriate, until such time as the relevant checks are completed to our
                  satisfaction.
                </p>
                <p className="mt-4">You agree to abide by these "Terms and Conditions" at all times, and:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>not to be acting in the interests of any third party;</li>
                  <li>not to utilize money obtained from ill-gotten means;</li>
                  <li>not to credit accounts with bank/credit card/s you are not authorized to use;</li>
                  <li>
                    not to try to hack the Company Mobile service, Website and all other
                    media/electronic platforms, or to alter its code in any way in an attempt to
                    cheat, override or manipulate the system or in any way commit fraud or any other
                    crime;
                  </li>
                  <li>
                    not to adopt any criminal behavior against the Company, its affiliates, its
                    customers or any third party;
                  </li>
                  <li>
                    not to mislead the Company by intentionally providing false information which
                    may be in the form of but not limited to invalid account details, forged
                    documentation, concealing one's identity, untruthful behavior or hiding one's
                    true location and/or age.
                  </li>
                </ul>
                <p className="mt-4">
                  In the event that you breach one or more of the Account rules as mentioned above,
                  the Company reserves the right to close your account and seize any available
                  funds. In any such suspected circumstance, the Company will report the activity to
                  the appropriate authority and the player may suffer the consequences thereto.
                  Contractual obligations will be honored unless there is any breach of any of the
                  terms and conditions on your part or breach of any international law and laws of
                  Kenya. The specific games/products shall be strictly guided by these rules &
                  guidelines herein and all other Rules & guidelines that shall be issued from time
                  to time by the Company. The products, guidelines and Rules shall remain at all
                  times the property of the Company.
                </p>
                <p className="mt-4">
                  At all times during the subsistence of your subscription/ participation, it is
                  your responsibility to ensure that you are not infringing on any laws in your
                  jurisdiction when opening an account and conducting business with the Company.
                </p>
                <p className="mt-4">
                  You must submit the correct information during your registration. You agree to
                  update this information should there be any changes to your registration data.
                </p>
                <p className="mt-4">
                  The Company will accept no liability from third parties whatsoever, resulting from
                  your providing incorrect or false data.
                </p>
                <p className="mt-4">
                  Each customer must open only one account. Should we identify any customer with
                  more than one account, we reserve the right to close any or all of these accounts.
                </p>
                <p className="mt-4">
                  If the Company detects multiple accounts which have been setup deliberately with
                  misleading information, have displayed criminal behavior, or if the Company
                  concludes that the account-owner has fraudulent intentions, the Company shall be
                  entitled to close the accounts and confiscate all funds, including the initial
                  deposit. In any such suspected circumstance, the Company will report the activity
                  to the appropriate authority and the player may suffer the consequences thereto.
                  If you nominate another person as an authorized user of your account, you shall be
                  responsible for all transactions such a person makes using the relevant account
                  details. Should you lose your account details or feel that someone else may have
                  your account details, please Contact Us immediately. The Company will however not
                  be responsible for any loss or damage that you may suffer as a result of
                  transaction made by that other person. Please note that personal registration
                  details and any other sensitive data should never be shared with third parties or
                  sent to us by any unencrypted form.
                </p>
                <p className="mt-4">
                  The Company manages players' accounts and calculates available funds, pending
                  funds, as well as the amount and value of any potential prizes. Unless proven
                  otherwise, these amounts are considered as final and are not subject to dispute.
                </p>
                <p className="mt-4">
                  All account transactions are performed in Kenya Shillings. No interest is paid on
                  any funds, irrespective of the amount held in your account or any delay in
                  remitting funds in your account for any reason.
                </p>
                <p className="mt-4">
                  The Company is not a financial institution and shall not be used as an
                  intermediary to transfer funds, used or unused with or without ill intentions as
                  well as using the Company as a currency exchange bureau. Should you conduct
                  account activities for these purposes, the Company reserves the right to close
                  your account and/or seize any available funds available in the account.
                  Contractual obligations will be honored unless there is a breach of any of the
                  terms and conditions. No credit will be offered by the Company or from any
                  employee of the Company. The Company reserves the right to void any games which
                  may have inadvertently been started when the account did not have sufficient
                  funds. Should funds be credited to a customer's account in error, it is the
                  customer's responsibility to inform the Company without delay. The Company will
                  recover such funds by account adjustment.
                </p>
                <p className="mt-4">
                  The Company does not tolerate abusive, aggressive or obscene language/ behavior
                  towards representatives of the Company across any of our support platforms (chat,
                  email, telephone, outlets). Should you decide to communicate with us in this
                  manner, you will be denied access to any and all of our support platforms and any
                  such acts will be reported to the relevant authority for action.
                </p>
                <p className="mt-4">
                  You must keep your login ID and any provided passwords secret at all times. It is
                  your sole responsibility to ensure that your login information is kept secure.
                  Should you suspect that your login information is no longer secure you are
                  required to immediately contact the company as well as change your security
                  details immediately. If at any time your account is accessed and used by a third-
                  party without your prior consent, the Company is not liable for any consequences
                  that may occur.
                </p>
                <p className="mt-4">
                  Your Username must be your registered telephone (mobile) number.
                </p>
                <p className="mt-4">
                  Selling and/or transferring and/or, acquiring of accounts to/from other players,
                  is prohibited. Any such action will lead to close of account and forfeiture of the
                  funds in such account. The company may in its sole discretion reopen an account if
                  there is sufficient proof to the satisfaction of the company that a transfer was
                  done in error.
                </p>
                <p className="mt-4">
                  A dormant account is an account that has not been accessed for 3 months, that has
                  a legal registration with or without money balance. Once your account becomes
                  dormant, the Company, shall in its sole discretion, close your account and
                  thereafter either refund the balance to you or where applicable deal with it in
                  the manner provided for in law less any cost accruing thereon.
                </p>
                <p className="mt-4">
                  The Company reserves the right to terminate the relationship between the Company
                  and any of its players at any time which decision is purely at its discretion. The
                  Company also reserves the right to close or suspend your account at any time and
                  for any reason. Without limiting the provisions of the preceding sentence, the
                  company shall be entitled to close or suspend your account if:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>you become bankrupt;</li>
                  <li>
                    the Company considers that you have used the services/products/platforms in a
                    fraudulent manner or for illegal and/or unlawful or improper purposes;
                  </li>
                  <li>
                    the Company considers that you have used the services/products/platforms in an
                    unfair manner or have deliberately cheated or taken unfair advantage of the
                    Company or any of its customers;
                  </li>
                  <li>
                    the Company is requested to do so by the police, any regulatory authority or
                    court; or
                  </li>
                  <li>
                    the Company considers that any of the events referred to above may have occurred
                    or are likely to occur.
                  </li>
                </ul>
                <p className="mt-4">
                  If the Company closes or suspends your account for any of the reasons above, you
                  shall be liable for any and all claims, losses, liabilities, damages, costs and
                  expenses incurred or suffered by the Company (together "Claims") arising there
                  from and shall indemnify and hold the Company harmless on demand for such Claims.
                  The Company shall also be entitled to withhold and/or retain any and all amounts
                  which would otherwise have been paid or payable to you (including any winnings or
                  bonus payments).
                </p>
                <p className="mt-4">
                  In addition, the Company shall be entitled to withhold and/or retain any and all
                  amounts earned or received by you as a result of or in connection with your
                  "unauthorized" use of the services/products/platforms including activities which
                  are not for an authorized purpose.
                </p>
                <p className="mt-4">
                  Where it is proved that these Terms and Conditions have not been breached, any
                  funds available in the account will be returned to the player should the
                  relationship be terminated by the Company. At all times, any funds deposited by a
                  subscriber/player, do not accrue any interest and as such any refunds made shall
                  not incorporate any interest calculations.
                </p>
                <p className="mt-4">
                  The Company prohibits and takes measures to prohibit use of devices, such as
                  robots, computers that distort normal and fair game play. Should the use of such
                  electronic added devices be discovered, the Company will disqualify such
                  player(s), close all such accounts and confiscate all funds due to such accounts.
                  In any such suspected circumstance, the Company will report the activity to the
                  appropriate authority and the player may suffer the consequences thereto.
                </p>
              </div>

              {/* Deposits, transfers and withdrawals */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  Deposits, transfers and withdrawals
                </h2>
                <p>
                  For all deposits, the Number of the depositor must be identical to the mobile
                  phone number registered on the Company account receiving the funds i.e. the
                  registered account. Any charges levied by the Mobile Operators payment gateways
                  (eg: MPesa and Airtel Money) will be deducted from the player's account. You
                  should only deposit money in your account for the purposes of you using such money
                  to play games on our platforms. We shall be entitled to suspend or close your
                  account if we reasonably consider or have reason to believe that you are
                  depositing money without any intention to use those full amounts to play games.
                  You may only start a new game if you have sufficient funds in your account.
                </p>
                <p className="mt-4">
                  Bonus funds may be credited to your account as part of a promotion, loyalty or
                  other marketing campaign. These funds cannot be directly withdrawn/paid-out, but
                  must be used for paying for games or in-game extras. Depending on the promotion,
                  these credits may be convertible into hard currency after fulfilling a specific
                  set of Terms and Conditions associated with the promotion.
                </p>
                <p className="mt-4">
                  You can at any time log into your account and view a statement showing all
                  transactions made within the last 30 Calendar days. Should you notice any mistakes
                  you should immediately notify the Company. Such anomaly once confirmed, will be
                  rectified by the company in the shortest time possible at no cost to you.
                </p>
                <p className="mt-4">
                  You can withdraw your money any time in accordance with the terms herein. We have
                  a number of controls and checks that take place before any withdrawal request is
                  processed. Thereafter, an SMS with a verification code will be sent to you. These
                  checks are part of our ongoing commitment to maintaining the security of our
                  customers' funds. All withdrawals requests cannot be processed after the expiry of
                  fifteen (15 minutes) from the withdrawal request being made. Any charges levied by
                  the Mobile Money gateways (eg:MPesa, Airtel Money,) will be deducted from the
                  players account.
                </p>
                <p className="mt-4">
                  Should you attempt to withdraw funds that were deposited but not used for playing
                  our games, the Company may levy a processing fee of 10% upon such withdrawals.
                  Additionally, should these transactions be deemed suspicious, the Company will
                  report the activity to the appropriate authority and the player may lose these
                  funds.
                </p>
                <p className="mt-4">
                  Where possible, all valid withdrawals will be processed to the payment account
                  from which the deposits were validly made. Withdrawal payments can only be made in
                  the name of and to the registered account holder. For most payment types,
                  withdrawals can be processed by following the withdrawal protocol steps provided,
                  subject to there being sufficient funds in your betting account. There is no set
                  maximum withdrawal amount per day but withdrawal requests may not exceed:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>your particular mobile operator limits;</li>
                  <li>
                    amounts greater than Kshs 500,000/=, may require additional arrangements.
                  </li>
                </ul>
                <p className="mt-4">For full details on each specific payment type, please call customer care.</p>
                <p className="mt-4">
                  If the value of a deposit is not played through in full before a withdrawal is
                  requested, the Company reserves the right to make a charge to the customer's
                  account to cover all reasonable costs relating to both the deposit and withdrawal.
                  If necessary, the value of the withdrawal requested may be reduced accordingly.
                </p>
                <p className="mt-4">
                  If we incur any charge-backs, reversals or other charges in respect of your
                  account, we reserve the right to charge you for the relevant amounts incurred.
                </p>
                <p className="mt-4">
                  The Company may, at any time, set off any positive balance on your account against
                  any amounts owed by you to the Company.
                </p>
                <p className="mt-4">
                  In the event that you access the services from jurisdictions outside Kenya, you
                  shall be responsible for reporting your winnings and losses to the tax and/or
                  other authorities as per the existing regulations within in your jurisdiction.
                </p>
                <p className="mt-4">
                  Gaming/staking, gambling may be illegal in the jurisdiction in which you are
                  located. Where you attempt to transact on our platform from jurisdictions where
                  staking/gaming is illegal, you do so at your own risk and the Company will not
                  bear any liability towards you.
                </p>
                <p className="mt-4">The Company reserves the right to take time necessary for the purpose of:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>verifying your identity;</li>
                  <li>verifying your gaming activity;</li>
                  <li>
                    conducting security and other internal procedures in relation to your account;
                    and
                  </li>
                  <li>ensure that prizes offered are paid out to the rightfully registered customer;</li>
                </ul>
                <p className="mt-4">
                  If you want to close your account, please contact our customer service team. If by
                  any chance, your account reflects a negative balance, such balance shall fall
                  immediately due and payable to the Company, and your account will not be suspended
                  until the relevant amount owed to the Company is paid in full.
                </p>
              </div>

              {/* COMPLAINTS, DISPUTES, GOVERNING LAW AND JURISDICTION */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  COMPLAINTS, DISPUTES, GOVERNING LAW AND JURISDICTION
                </h2>
                <p>
                  Should there be any claim or dispute arising from a past or current transaction,
                  please Contact Us. If the Company is unable to settle the dispute, the Company
                  will refer the dispute to an arbiter, such as the Nairobi Centre for International
                  Arbitration, whose decision will be final (save in respect of any manifest error)
                  subject to full representation given to all parties involved. No dispute regarding
                  any game / interaction will result in litigation, court action unless the Company
                  fails to implement the decision given by arbitration.
                </p>
                <p className="mt-4">
                  These Terms and Conditions and any dispute or claim arising out of or in
                  connection with it or its subject matter, shall be governed and construed in
                  accordance with the laws of Kenya regardless of the player's country of domicile.
                </p>
                <p className="mt-4">
                  By accepting these Terms and Conditions and/or playing Company games and/or making
                  use (whether authorised or not) of the facilities offered by the Company (whether
                  through the Mobile service, Website and all other media/electronic platforms, or
                  otherwise), you irrevocably agree that the courts of Kenya shall have exclusive
                  jurisdiction to settle any dispute which may arise out of or in connection with
                  these Terms and Conditions. Notwithstanding the foregoing, the Company shall be
                  entitled to bring a claim against a customer in the court of the customer's
                  country of domicile.
                </p>
              </div>

              {/* OFFERS, BONUSES, PROMOTIONS */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  OFFERS, BONUSES, PROMOTIONS
                </h2>
                <p>
                  All customer offers are limited to one per each telephone number, same payment
                  account number. We reserve the right to withdraw the availability of any offer or
                  all offers to any customer at any time and at our sole and absolute discretion.
                  Offers only apply to customers who have made an actual/real money deposit with the
                  Company.
                </p>
                <p className="mt-4">
                  Where any term of the offer or promotion is breached or there is any evidence of a
                  series of games played by a customer which due to a deposit bonus, enhanced
                  payments, free play games or any other promotional offer results in guaranteed
                  customer profits irrespective of the outcome, whether individually or as part of a
                  group, the Company reserves the right to reclaim the bonus element of such offers
                  and in the Company absolute discretion settle any amounts funded by the deposit
                  bonus. In addition, the Company reserves the right to levy an administration
                  charge on the customer up to the value of the deposit bonus, or additional payment
                  to cover administrative costs. The Company further reserves the right to ask any
                  customer to provide sufficient documentation for the Company to be satisfied in
                  its absolute discretion as to the customer's identity prior to the Company
                  crediting any bonus, free play or offer to the customer's account.
                </p>
                <p className="mt-4">
                  The Company reserves the right to amend the terms of or cancel any customer offer
                  at any time.
                </p>
              </div>

              {/* USE OF THE SERVICE, WEBSITE AND ALL OTHER MEDIA/ELECTRONIC PLATFORMS */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  USE OF THE SERVICE, WEBSITE AND ALL OTHER MEDIA/ELECTRONIC PLATFORMS
                </h2>
                <p>
                  Information and Content Information accessed by you on the Mobile service, Website
                  and all other media/electronic platforms (including results, statistics) is for
                  your personal use only and the distribution or commercial exploitation of such
                  information is strictly prohibited. No warranty is given as to the uninterrupted
                  provision of such information, its accuracy or as to the results obtained through
                  its use. The information is not intended to amount to advice or recommendations
                  and is provided for information purposes only. It should not be relied upon when
                  making financial decisions and transactions, which are made at your own risk and
                  discretion.
                </p>
                <p className="mt-4">
                  Your computer or mobile device and internet connection may affect the performance
                  and/or operation of the Mobile service, Website and all other media/electronic
                  platforms. The Company does not guarantee that the Mobile service, Website and all
                  other media/electronic platforms, will operate without faults or errors or that
                  the Company services will be provided without interruption. The Company does not
                  accept any liability for any failures or issues that arise due to your equipment,
                  internet connection or internet or telecommunication service provider (including,
                  for example, if you are unable to complete a game in progress, or to view or
                  receive certain information in relation to particular events).
                </p>
              </div>

              {/* FAIR USE */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">FAIR USE</h2>
                <p>
                  The Mobile service, Website and all other media/electronic platforms and the
                  Company products may only be used for the purposes of playing games on the
                  Company's platform and/or paying for in-game products.
                </p>
                <p className="mt-4">
                  You must not use the Mobile service, Website and all other media/ electronic
                  platforms for any purpose which (in the Company's opinion) is illegal, defamatory,
                  abusive or obscene, or which the Company considers discriminatory, fraudulent,
                  dishonest or inappropriate.
                </p>
                <p className="mt-4">
                  The Company will seek criminal and contractual sanctions against any customer
                  involved in fraudulent, dishonest or criminal acts via or in connection with the
                  Mobile service, Website and all other media/ electronic platforms or the Company's
                  products. The Company will withhold payment to any customer where any of these are
                  suspected. The customer shall indemnify and shall be liable to pay to the Company,
                  on demand, all Claims (as defined herein above) arising directly or indirectly
                  from the customer's fraudulent, dishonest or criminal act.
                </p>
              </div>

              {/* SOFTWARE AND TECHNOLOGY ISSUES */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  SOFTWARE AND TECHNOLOGY ISSUES
                </h2>
                <p>
                  You are only permitted to use any and all software made available to you via the
                  Mobile service, Website, or other media/electronic platforms, for the purpose of
                  using products on the Mobile devices or all other media/electronic platforms, and
                  save to the extent permitted by applicable law, for no other purposes whatsoever.
                </p>
                <p className="mt-4">
                  We hereby grant to you a personal, non-exclusive, non-transferable right to use
                  the relevant software, for the sole purpose of using/playing products on the
                  Mobile devices and all other media/electronic platforms, in accordance with the
                  following provisions:
                </p>
                <p className="mt-4">You are not permitted to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    install or load the software onto a server or other networked device or take
                    other steps to make the software available via any form of "bulletin board",
                    online service or remote dial-in or network to any other person;
                  </li>
                  <li>
                    sub-license, assign, rent, lease, loan, transfer or copy (except as expressly
                    provided elsewhere in these terms and conditions) your license to use the
                    software or make or distribute copies of the software;
                  </li>
                  <li>
                    enter, access or attempt to enter or access or otherwise bypass the Company's
                    security system or interfere in any way (including but not limited to, robots
                    and similar devices) with the relevant products or the Mobile service, and all
                    other media/electronic platforms any changes to the software and/or any features
                    or components thereof; or
                  </li>
                  <li>
                    copy or translate any user documentation provided 'online' or in electronic
                    format.
                  </li>
                </ul>
                <p className="mt-4">
                  In addition, and except to the minimum extent permitted by applicable law in
                  relation to computer programs (including, the purposes expressly permitted as per
                  the Kenya Information & Communication Act (CAP 411A) of the Laws of Kenya or any
                  law replacing/repealing and or amending the said laws and any other relevant law)
                  you are not permitted to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    translate, reverse engineer, decompile, disassemble, modify, create derivative
                    works based on, or otherwise modify the software; or
                  </li>
                  <li>
                    reverse engineer, decompile, disassemble, modify, adapt, translate, make any
                    attempt to discover the source code of the software or to create derivative
                    works based on the whole or on any part of the software.
                  </li>
                </ul>
                <p className="mt-4">
                  You do not own the software. The software is owned and is the exclusive property
                  of the Company or a third party software provider company (the "Software
                  Provider"). Any software and accompanying documentation which have been licensed
                  to the Company are proprietary products of the Software Provider and protected
                  worldwide by copyright law. Your use of the software does not give you ownership
                  of any intellectual property rights in the software.
                </p>
                <p className="mt-4">
                  The software is provided "as is" without any warranties, conditions, undertakings
                  or representations, express or implied, statutory or otherwise. The Company hereby
                  excludes all implied terms, conditions and warranties (including any of
                  merchantability, satisfactory quality and fitness for any particular purpose). The
                  Company does not warrant that:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>the software will meet your requirements;</li>
                  <li>the software will not infringe any third party's intellectual property rights;</li>
                  <li>the operation of the software will be error free or uninterrupted;</li>
                  <li>any defects in the software will be corrected; or</li>
                  <li>the software or the servers are virus-free.</li>
                </ul>
                <p className="mt-4">
                  In the event of communications or system errors occurring in connection with the
                  settlement of accounts or other features or components of the software, neither
                  the Company nor the Software Provider will have any liability to you or to any
                  third party in respect of such errors. The Company reserves the right in the event
                  of such errors to remove all relevant products from the Mobile service, Mobile
                  service, Website and all other media/ electronic platforms, and all other
                  media/electronic platforms, and take any other action to correct such errors.
                </p>
                <p className="mt-4">
                  You hereby acknowledge that your use of the software is outside of the Company's
                  control. Accordingly, you load and use the software at your own risk. The Company
                  will not have any liability to you or to any third party in respect of your
                  receipt of and/or use of the software.
                </p>
                <p className="mt-4">
                  The software may include confidential information which is secret and valuable to
                  the Software Provider and/or the Company. You are not entitled to use or disclose
                  that confidential information other than strictly in accordance with these Terms
                  and Conditions.
                </p>
                <p className="mt-4">
                  While the Company endeavors to ensure that the Mobile service, Website and all
                  other media/electronic platforms, are available 24 hours a day, the Company shall
                  not be liable if for any reason the Mobile service, Website and all other
                  media/electronic platforms are unavailable at any time or for any period. We
                  reserve the right to make changes or corrections to or to alter, suspend or
                  discontinue any aspect of the content or services or products available through
                  it, including your access to it.
                </p>
                <p className="mt-4">
                  You must not misuse the Mobile service, Website and all other media/ electronic
                  platforms by introducing viruses, Trojans, worms, logic bombs or other material
                  which is malicious or technologically harmful. In particular, you must not access
                  without authority, interfere with, damage or disrupt the Mobile service, Website
                  and all other media/electronic platforms, or any part of it; any equipment or
                  network on which the data is stored; any software used in connection with the
                  provision of the Mobile service, Website and all other media/electronic platforms;
                  or any equipment, software, owned or used by a third party. You must not attack
                  our Mobile service, Website and all other media/electronic platforms, via a
                  denial-of-service attack. We will not be liable for any loss or damage caused by a
                  distributed denial-of-service attack, viruses or other technologically harmful
                  material that may infect your computer equipment, computer programs, data or other
                  proprietary material due to your use of software or to your downloading of any
                  material posted on it, or on any Mobile service, Website and all other
                  media/electronic platforms, linked to it.
                </p>
              </div>

              {/* THIRD PARTY CONTENT */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">THIRD PARTY CONTENT</h2>
                <p>
                  The Company receives feeds, commentaries and content from a number of suppliers.
                  Certain third party product providers may require you to agree to additional terms
                  and conditions governing the use of their feeds, commentaries and content. If you
                  do not accept the relevant third party terms and conditions, do not use the
                  relevant feeds, commentaries or content.
                </p>
                <p className="mt-4">
                  The Company does not accept any liability in respect of any third party feeds,
                  commentaries and content.
                </p>
                <p className="mt-4">
                  Where the Mobile service, Website and all other media/electronic platforms,
                  contains links to third party resources, these links are provided for your
                  information only. The Company has no control over the content of these sites or
                  resources, and accepts no liability for them or for any loss or damage that may
                  arise from your use of them. The inclusion of a link to a third party does not
                  constitute an endorsement of that third party's product or services (if
                  applicable).
                </p>
              </div>

              {/* RESPONSIBILITIES */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">RESPONSIBILITIES</h2>
                <p>
                  The Company will not be liable for any errors in respect of bets or stakes
                  including where:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    any error occurs in a random number generator or pay tables included,
                    incorporated or used in any game or product.
                  </li>
                </ul>
                <p className="mt-4">
                  Incorrect Price – Prior to the start of a game, In-Play or after the completion of
                  the game, where an Obvious Error is identified any plays started will stand and be
                  settled at the Company revised price.
                </p>
                <p className="mt-4">
                  Where there is sufficient time before the start of a game, the Company will
                  endeavour to contact the customer and may in our absolute discretion allow the
                  option of cancelling the game / tournament.
                </p>
              </div>

              {/* OTHER */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">OTHER</h2>
                <p>
                  The Company actively monitors traffic to and from the Mobile devices, Website and
                  all other media/electronic platforms. The Company reserves the right in its sole
                  discretion to block access where evidence indicative of automated or robotic
                  activity is found.
                </p>
                <p className="mt-4">
                  The Company reserves the right to restrict access to all or certain parts of the
                  Mobile service, Website and all other media/electronic platforms in respect of
                  certain jurisdictions.
                </p>
                <p className="mt-4">
                  The Company may alter or amend the products offered via the Mobile service,
                  Website and all other media/electronic platforms at any time and for any reason.
                </p>
                <p className="mt-4">
                  From time to time, all or part of the Mobile service, Website and all other
                  media/electronic platforms may be unavailable for offering their respective
                  services. Should that happen (unavailability) the Company shall not be liable for
                  any loss or damage that the customer may suffer.
                </p>
              </div>

              {/* OUR INTELLECTUAL PROPERTY RIGHTS */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  OUR INTELLECTUAL PROPERTY RIGHTS
                </h2>
                <p>
                  The contents of the Mobile service, Website and all other media/ electronic
                  platforms, and all other media/electronic platforms owned by the company are
                  protected by international copyright laws and other intellectual property rights.
                  The owner of these rights is the Company, its affiliates or other third party
                  licensors.
                </p>
                <p className="mt-4">
                  All product and company names and logos mentioned on the Mobile service, Website
                  and all other media/electronic platforms are the trademarks, service marks or
                  trading names of their respective owners, including the Company.
                </p>
                <p className="mt-4">
                  Except to the extent required to use a product for the purpose of playing the
                  Company's games, no part of the Website may be reproduced or stored, modified,
                  copied, republished, uploaded, posted, transmitted or distributed, by any means or
                  in any manner, or included in any other website or in any public or private
                  electronic retrieval system or service including text, graphics, video, messages,
                  code and/or software without our express prior written consent.
                </p>
                <p className="mt-4">
                  If you make use of a feature that allows you to upload material, information,
                  comments, postings or other content to the Mobile service, Website and all other
                  media/electronic platforms ("User Content"), then the User Content will be
                  considered to be non-confidential and non-proprietary and the Company has the
                  right to use, copy, distribute and disclose to third parties any User Content for
                  any purpose. The Company also has the right to disclose your identity to any third
                  party who is claiming that any User Content posted or uploaded by you to the
                  Mobile service, Website and all other media/electronic platforms, constitutes a
                  violation of their intellectual property rights or of their right to privacy. The
                  Company has the right to remove, amend or edit any User Content you make on the
                  Mobile service, Website and all other media/electronic platforms.
                </p>
                <p className="mt-4">
                  Any commercial use or exploitation of the Website or its content is strictly
                  prohibited. These Terms and Conditions, the Privacy Policy, the Rules and any
                  document expressly referred to in them and any guidelines or rules posted on the
                  Website constitute the entire agreement and understanding of the parties and
                  supersede any previous agreement between the parties relating to their subject
                  matter. You acknowledge and agree that in entering into and agreeing to these
                  Terms and Conditions, the Privacy Policy, the Rules and any document expressly
                  referred to in them and any guidelines or rules posted on the Mobile service,
                  Website and all other media/electronic platforms, you do not rely on, and shall
                  have no remedy in respect of, any statement, representation, warranty,
                  understanding, promise or assurance (whether negligently or innocently made) of
                  any person (whether party to this agreement or not) other than as expressly set
                  out therein. Nothing in this clause shall operate to limit or exclude any
                  liability for fraud or fraudulent misrepresentation
                </p>
              </div>

              {/* ANTI-MONEY LAUNDERING */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">ANTI-MONEY LAUNDERING</h2>
                <p>
                  The Company shall not be used to carry out any illegal activities by participants
                  and all players shall adhere to the strictest discipline and moral turpitude in
                  their dealings with the company and shall enhance the company ability to adhere to
                  the provisions of The Proceeds of Crime and Anti-Money Laundering Act No. 9 of
                  2009 of Kenya and as it shall be amended from time to time and all other enabling
                  laws and conventions.
                </p>
                <p className="mt-4">
                  The Company will subject all transactions to serious scrutiny to prevent money
                  laundering and other illegal activities.
                </p>
                <p className="mt-4">
                  If you become aware of any suspicious activity relating to individual(s),
                  participants, players, officials or of any correctness or malfunctioning of the
                  Games, its software or appliances, you must report such activity or inactivity to
                  the Company immediately.
                </p>
                <p className="mt-4">
                  Suspicious transactions will be reported to the relevant Authorities and where the
                  company suffers pecuniary loss or injury to its person or reputation, all legal
                  means will be employed to restore such injuries at the risk of the perpetrator.
                </p>
                <p className="mt-4">
                  The Company may suspend, block or close your account and withhold funds if so
                  required by the Proceeds of Crime and Anti-Money Laundering Act No. 9 of 2009 or
                  any relevant legislation or as demanded by the authorities.
                </p>
              </div>

              {/* COMPLAINTS */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">COMPLAINTS</h2>
                <p>
                  If you have a complaint; you can email customer support on{" "}
                  <a
                    href="mailto:support@usiku.games"
                    className="text-orange-500 hover:text-orange-400 underline"
                  >
                    support@usiku.games
                  </a>
                  . The Company will at all times apply best efforts to resolve a reported matter
                  promptly.
                </p>
                <p className="mt-4">
                  If you have a query with regard to any transaction, you may also contact the
                  Company at{" "}
                  <a
                    href="mailto:support@usiku.games"
                    className="text-orange-500 hover:text-orange-400 underline"
                  >
                    support@usiku.games
                  </a>{" "}
                  with details of the query. The Company will review any queried or disputed
                  transactions.
                </p>
                <p className="mt-4">
                  In all other times where a dispute arises, parties shall refer the matter for
                  Arbitration by a single arbitrator agreed by the parities where the chosen venue
                  shall be Nairobi. Where there is no agreement each party shall appoint an
                  arbitrator and the nominated arbitrators shall appoint a single arbitrator and
                  where they are unable to agree the Chairman for the time being of the Kenyan
                  Chapter of Chartered Institute of Arbitrators shall appoint one.
                </p>
              </div>

              {/* MISCELLANEOUS */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">MISCELLANEOUS</h2>
                <p>
                  In no event will any delay, failure or omission (in whole or in part) in
                  enforcing, exercising or pursuing any right, power, privilege, claim or remedy
                  conferred by or arising under these Terms and Conditions or by law, be deemed to
                  be or construed as a waiver of that or any other right, power, privilege, claim or
                  remedy in respect of the circumstances in question, or operate so as to bar the
                  enforcement of that, or any other right, power, privilege, claim or remedy, in any
                  other instance at any time or times subsequently.
                </p>
                <p className="mt-4">
                  The rights and remedies provided by these Terms and Conditions are cumulative and
                  (unless otherwise provided in these Terms and Conditions) do not exclude any other
                  rights or remedies available in law.
                </p>
                <p className="mt-4">
                  If any provision of these Terms and Conditions is found by any court or
                  administrative body of competent jurisdiction to be invalid or unenforceable, such
                  invalidity or unenforceability shall not affect the other provisions of these
                  Terms and Conditions, which shall remain in full force and effect.
                </p>
                <p className="mt-4">
                  You shall confirm/accept and where necessary execute or cause to be executed all
                  documents and do or cause to be done all further acts and things consistent with
                  the terms of these Terms and Conditions that the Company may from time to time
                  reasonably require in order to vest in and secure to the Company the full benefit
                  of rights and benefits to be transferred or granted to the Company under these
                  Terms and Conditions and for the protection and enforcement of the same and
                  otherwise to give full effect to the terms of these Terms and Conditions.
                </p>
                <p className="mt-4">
                  Nothing in these Terms and Conditions shall create or be deemed to create a
                  partnership, joint venture or principal-agent relationship between the parties and
                  no party shall have authority to bind any other in any way unless expressly
                  provided otherwise in these Terms and Conditions.
                </p>
                <p className="mt-4">
                  The Company shall not be in breach of these Terms and Conditions nor liable for
                  delay in performing, or failure to perform, any of its obligations if such delay
                  or failure results from events, circumstances or causes beyond its reasonable
                  control including (without limitation) any telecommunications network failures,
                  power failures, failures in third party computer hardware or software, fire,
                  lightning, explosion, flood, severe weather, industrial disputes or lock-outs,
                  terrorist activity and acts of government or other competent authorities. In such
                  circumstances the time for performance shall be extended by a period equivalent to
                  the period during which performance of the obligation has been delayed or failed
                  to be performed.
                </p>
                <p className="mt-4">
                  The Company may assign, transfer, charge, sub-license or deal in any other manner
                  with these Terms and Conditions, or sub-contract any of its rights and obligations
                  under these Terms and Conditions, to any party including any company within the
                  Company group.
                </p>
                <p className="mt-4">
                  Any notice to be given under these Terms and Conditions must be in writing, in
                  English and may be served by hand delivery at, or by first class post, recorded
                  delivery or registered post or airmail:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    in the case of the Company, the address of the Company as set out at the
                    beginning of these Terms and Conditions and elsewhere; and
                  </li>
                  <li>
                    in respect of notices given by the Company to you, pursuant to the customer
                    registration procedure (including any amendment to those details you have
                    notified to the Company).
                  </li>
                </ul>
                <p className="mt-4">Any notice shall be deemed to have been received:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>if delivered by email, SMS, hand delivery, at the time of delivery;</li>
                  <li>
                    if sent by first class post, recorded delivery or registered post, at 14hrs
                    (Kenyan Time) on the second clear day after the date of posting;
                  </li>
                  <li>
                    if sent by pre-paid registered airmail, on the fifth clear day after the date of
                    posting; and
                  </li>
                  <li>if sent by fax, at the time of transmission by the sender.</li>
                </ul>
                <p className="mt-4">
                  The Appendices, the Privacy Policy, the Rules and any document expressly referred
                  to in them and any guidelines or rules posted on the Website form an integral part
                  of these Terms and Conditions and shall have effect as if set out in full in the
                  body of these Terms and Conditions.
                </p>
                <p className="mt-4">
                  In the event of any inconsistency between the main body of these Terms and
                  Conditions and the Appendices, the Privacy Policy, the Rules and/or any document
                  expressly referred to in them and any guidelines or rules posted on the Mobile
                  service, Website and all other media/electronic platforms shall prevail.
                </p>
                <p className="mt-4">
                  Where a player wins, and is pronounced dead before claiming any committed
                  winnings, the dependents or family can only claim the amount with the appropriate
                  court orders e.g Confirmation of Grant.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
