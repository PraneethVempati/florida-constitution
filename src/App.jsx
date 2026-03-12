import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ALL DATA FROM: FSU College of Law Library
// "Florida's Constitutions: The Documentary History"
// https://library.law.fsu.edu/Digital-Collections/CRC/CRC-1998/conhist/
//
// SCOPE: Constitution of 1838 + all 7 amendment sets through 1860
// Years on the timeline: 1838, 1846, 1847, 1848, 1850, 1852, 1858, 1860
// ─────────────────────────────────────────────────────────────────────────────

const TIMELINE_YEARS = [1838, 1846, 1847, 1848, 1850, 1852, 1858, 1860];

// Each section carries its own amendment history.
// amendments[] are shown only when viewYear >= amendment.year.
// status: "Adopted" | "Proposed"  (proposed = passed one assembly, awaiting second)
const ARTICLES = [
  {
    id: "preamble",
    title: "Preamble",
    sections: [
      {
        id: "pre-1",
        number: null,
        text: `We, the People of the Territory of Florida, by our Delegates in Convention, assembled at the City of St. Joseph, on Monday the 3d day of December, A.D. 1838, and of the Independence of the United States the sixty-third year, having and claiming the right of admission into the Union, as one of the United States of America, consistent with the principles of the Federal Constitution, and by virtue of the Treaty of Amity, Settlement, and Limits between the United States of America and the King of Spain, ceding the Provinces of East and West Florida to the United States; in order to secure to ourselves and our posterity the enjoyment of all the rights of life, liberty, and property, and the pursuit of happiness, do mutually agree, each with the other, to form ourselves into a Free and Independent State, by the name of the State of Florida.`,
        amendments: [],
      },
    ],
  },
  {
    id: "art1",
    title: "Article I — Declaration of Rights",
    sections: [
      {
        id: "a1s1", number: "Section 1",
        text: "That all freemen, when they form a social compact, are equal; and have certain inherent and indefeasible rights, among which are those of enjoying and defending life and liberty; of acquiring, possessing, and protecting property and reputation; and of pursuing their own happiness.",
        amendments: [],
      },
      {
        id: "a1s2", number: "Section 2",
        text: "That all political power is inherent in the people, and all free governments are founded on their authority, and established for their benefit; and, therefore, they have, at all times, an inalienable and indefeasible right to alter or abolish their form of government, in such manner as they may deem expedient.",
        amendments: [],
      },
      {
        id: "a1s3", number: "Section 3",
        text: "That all men have a natural and inalienable right to worship Almighty God according to the dictates of their own conscience; and that no preference shall ever be given by law to any religious establishment, or mode of worship in this State.",
        amendments: [],
      },
      {
        id: "a1s4", number: "Section 4",
        text: "That all elections shall be free and equal; and that no property qualification for eligibility to office, or for the right of suffrage, shall ever be required in this State.",
        amendments: [],
      },
      {
        id: "a1s5", number: "Section 5",
        text: "That every citizen may freely speak, write, and publish his sentiments on all subjects, being responsible for the abuse of that liberty; and no law shall ever be passed to curtail, abridge, or restrain the liberty of speech or of the press.",
        amendments: [],
      },
      {
        id: "a1s6", number: "Section 6",
        text: "That the right of trial by jury shall forever remain inviolate.",
        amendments: [],
      },
      {
        id: "a1s7", number: "Section 7",
        text: "That the people shall be secure in their persons, houses, papers, and possessions from unreasonable seizures and searches; and that no warrant to search any place, or to seize any person or thing, shall issue without describing the place to be searched, and the person or thing to be seized, as nearly as may be, nor without probable cause, supported by oath or affirmation.",
        amendments: [],
      },
      {
        id: "a1s8", number: "Section 8",
        text: "That no freeman shall be taken, imprisoned, or disseized of his freehold, liberties, or outlawed or exiled, or in any manner destroyed or deprived of his life, liberty, or property, but by the law of the land.",
        amendments: [],
      },
      {
        id: "a1s10", number: "Section 10",
        text: "That in all criminal prosecutions, the accused hath a right to be heard by himself or counsel, or both; to demand the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor; and in all prosecutions by indictment or presentment a speedy and public trial, by an impartial jury of the County or District, where the offense was committed; and shall not be compelled to give evidence against himself.",
        amendments: [],
      },
      {
        id: "a1s14", number: "Section 14",
        text: "That private property shall not be taken or applied to public use, unless just compensation be made therefor.",
        amendments: [],
      },
      {
        id: "a1s21", number: "Section 21",
        text: "That the free white men of this State shall have the right to keep and to bear arms, for their common defense.",
        amendments: [],
      },
    ],
  },
  {
    id: "art2",
    title: "Article II — Distribution of Powers",
    sections: [
      {
        id: "a2s1", number: "Section 1",
        text: "The powers of the Government of the State of Florida, shall be divided into three distinct departments, and each of them confided to a separate body of Magistracy, to wit: Those which are Legislative to one; those which are Executive to another; and those which are Judicial to another.",
        amendments: [],
      },
      {
        id: "a2s2", number: "Section 2",
        text: "No person, or collection of persons, being one of those departments, shall exercise any power properly belonging to either of the others, except in the instances expressly provided in this Constitution.",
        amendments: [],
      },
    ],
  },
  {
    id: "art3",
    title: "Article III — Executive Department",
    sections: [
      {
        id: "a3s1", number: "Section 1",
        text: "The Supreme Executive Power shall be vested in a Chief Magistrate, who shall be styled the Governor of the State of Florida.",
        amendments: [],
      },
      {
        id: "a3s2", number: "Section 2",
        text: "The Governor shall be elected for four years, by the qualified electors, at the time and place where they shall vote for Representatives, and shall remain in office until a successor be chosen and qualified, and shall not be eligible to re-election until the expiration of four years thereafter.",
        amendments: [],
      },
      {
        id: "a3s14", number: "Section 14",
        text: "There shall be a Secretary of State appointed by joint vote of both Houses of the General Assembly, who shall continue in office during the term of four years; and he shall keep a fair register of the official acts and proceedings of the Governor, and shall, when required, lay the same and all papers, minutes, and vouchers, relative thereto, before the General Assembly, and shall perform such other duties as may be required of him by law.",
        amendments: [
          {
            year: 1852,
            label: "Sixth General Assembly, 1852 — Art. III, §14",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 20, 1852; House Jan. 1, 1853",
            amendedText: `There shall be a Secretary of State elected by the qualified voters of this State on the first Monday in October, in the year 1856, who shall continue in office during the term of four years; and he shall keep a fair register of the official acts and proceedings of the Governor, and shall, when required, lay the same, and all papers, minutes and vouchers relative thereto, before the General Assembly, and shall perform such other duties as may be required of him by law: Provided, That the term of office of the Secretary of State to be elected under this amended Constitution, shall not commence until the term of office of the officer now elected shall expire.`,
            change: "Changes appointment of Secretary of State from joint vote of both Houses to election by qualified voters of the State. First popular election set for October 1856.",
          },
        ],
      },
      {
        id: "a3s23", number: "Section 23",
        text: "A State Treasurer, and Comptroller of Public Accounts, shall be elected by joint vote of both Houses of the General Assembly, at each regular session thereof.",
        amendments: [
          {
            year: 1852,
            label: "Sixth General Assembly, 1852 — Art. III, §23",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 20, 1852; House Jan. 1, 1853",
            amendedText: `A State Treasurer and Comptroller of Public Accounts shall be elected by the qualified electors of this State on the first Monday in October in the year 1856, and every two years thereafter.`,
            change: "Changes election of State Treasurer and Comptroller from joint vote of General Assembly to popular election by qualified electors. First election set for October 1856.",
          },
        ],
      },
    ],
  },
  {
    id: "art4",
    title: "Article IV — Legislative Department",
    sections: [
      {
        id: "a4s1", number: "Section 1",
        text: `The Legislative power of this State shall be vested in two distinct branches, the one to be styled the Senate, the other the House of Representatives, and both together, "The General Assembly of the State of Florida," and the style of all the laws shall be "Be it enacted by the Senate and House of Representatives of the State of Florida in General Assembly convened."`,
        amendments: [],
      },
      {
        id: "a4s2", number: "Section 2",
        text: "The members of the House of Representatives shall be chosen by the qualified voters, and shall serve for the term of one year from the day of the commencement of the general election and no longer, and the sessions of the General Assembly shall be annual, and commence on the fourth Monday in November in each year, or at such other time, as may be prescribed by law.",
        amendments: [
          {
            year: 1846,
            label: "Second General Assembly, 1846 — Art. IV, §2",
            status: "Proposed",
            passedDate: "Passed Senate Dec. 22, 1846; House Dec. 29, 1846 — subject to action of Third General Assembly",
            amendedText: `The members of the House of Representatives shall be chosen by the qualified voters, and shall serve for the term of two years, from and after the day of the first election under the amended Constitution, and no longer; and the sessions of the General Assembly shall be biennial, and commence on the fourth Monday in November, in each and every second year, or at such other times as may be prescribed by law.`,
            change: "Proposes changing House terms from 1 year to 2 years and sessions from annual to biennial. Must be ratified by the Third General Assembly before taking effect.",
          },
          {
            year: 1847,
            label: "Third General Assembly, 1847 — Art. IV, §2",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 22, 1847; House Jan. 6, 1848 — ADOPTED",
            amendedText: `The members of the House of Representatives shall be chosen by the qualified voters, and shall serve for the term of two years, from and after the day of the first election under the amended Constitution, and no longer; and the sessions of the General Assembly shall be biennial, and commence on the fourth Monday in November, in each and every second year, or at such other times as may be prescribed by law.`,
            change: "Ratified by Third General Assembly. Sessions changed from annual to biennial. House terms changed from 1 year to 2 years. First election under amended Constitution: October 1848.",
          },
          {
            year: 1858,
            label: "Ninth General Assembly, 1858 — Art. IV (Annual Sessions)",
            status: "Proposed",
            passedDate: "Passed 1858 — subject to action of Tenth General Assembly",
            amendedText: `[Annual Sessions amendment — text as proposed by Ninth General Assembly, subject to ratification]`,
            change: "Proposes restoring annual sessions of the General Assembly, reversing the 1847 biennial amendment. Must be ratified by Tenth General Assembly.",
          },
          {
            year: 1860,
            label: "Tenth General Assembly, 1860 — Art. IV (Annual Sessions)",
            status: "Adopted",
            passedDate: "Passed Senate Feb. 4, 1861; House Feb. 7, 1861 — ADOPTED",
            amendedText: `That the members of the House of Representatives shall be chosen by the qualified voters, and shall serve for the term of two years from and after the day of the first election under the amended Constitution and no longer; and the sessions of the General Assembly shall be annual, and commence on the 3d Monday of November in each year, or at such other times as may be prescribed by law. [...] That the act entitled an act to amend the Constitution of this State so as to make the sessions of the General Assembly biennial instead of annual, be and the same is hereby abrogated and annulled, so far as the same is inconsistent with the provisions of this act.`,
            change: "Annual sessions restored. The 1847 biennial sessions act expressly abrogated and annulled. Sessions to commence 3rd Monday of November each year. Sessions limited to 30 days unless majority votes to extend.",
          },
        ],
      },
      {
        id: "a4s5", number: "Section 5",
        text: "The Senators shall be chosen by the qualified electors, for the term of two years, at the same time, in the same manner, and in the same places where they vote for members of the House of Representatives; and no man shall be a Senator, unless he be a white man, a citizen of the United States, and shall have been an inhabitant of this State, two years next preceding his election, and the last year thereof, a resident of the District or County for which he shall be chosen, and shall have attained the age of twenty-five years.",
        amendments: [
          {
            year: 1846,
            label: "Second General Assembly, 1846 — Art. IV, §5",
            status: "Proposed",
            passedDate: "Passed Senate Dec. 22, 1846; House Dec. 29, 1846 — subject to Third General Assembly",
            amendedText: `The Senators shall be chosen by the qualified electors, for the term of four years, at the same time, in the same manner, and in the same place where they vote for members of the House of Representatives; and no person shall be a Senator unless he be a white man, a citizen of the United States, and shall have been an inhabitant of this State for two years next preceding his election, and the last year a resident of the district or county for which he shall be chosen, and shall have attained the age of twenty-five years.`,
            change: "Proposes extending Senate term from 2 years to 4 years. Subject to ratification by Third General Assembly.",
          },
          {
            year: 1847,
            label: "Third General Assembly, 1847 — Art. IV, §5",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 22, 1847; House Jan. 6, 1848 — ADOPTED",
            amendedText: `The Senators shall be chosen by the qualified electors, for the term of four years, at the same time, in the same manner, and in the same place where they vote for members of the House of Representatives; and no person shall be a Senator unless he be a white man, a citizen of the United States, and shall have been an inhabitant of this State for two years next preceding his election, and the last year a resident of the district or county for which he shall be chosen, and shall have attained the age of twenty-five years.`,
            change: "Senate term extended from 2 years to 4 years. Adopted along with the biennial sessions amendment of 1847.",
          },
        ],
      },
      {
        id: "a4s6", number: "Section 6",
        text: "The Senators after their first election, shall be divided by lot, into two classes, and the seats of the Senators of the first class, shall be vacated at the expiration of the first year, and of the second class, shall be vacated at the expiration of the second year, so that one half thereof, as near as possible, may be chosen for ever thereafter, annually, for the term of two years.",
        amendments: [
          {
            year: 1847,
            label: "Third General Assembly, 1847 — Art. IV, §6",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 22, 1847; House Jan. 6, 1848 — ADOPTED",
            amendedText: `The classification of Senators, as made at the first session of the General Assembly held in the year 1845, shall continue unchanged; one-half of whom, as nearly as possible, shall be chosen forever hereafter biennially for the term of four years: Provided, however, and it is hereby declared, that the term of office of that class of Senators unexpired at the first election under the amended Constitution, shall extend to, and expire on, the first Monday in October, eighteen hundred and fifty.`,
            change: "Updated Senate rotation to align with new biennial election cycle and 4-year terms. Classification made in 1845 preserved; expiration of first class set to October 1850.",
          },
        ],
      },
    ],
  },
  {
    id: "art5",
    title: "Article V — Judicial Department",
    sections: [
      {
        id: "a5s1", number: "Section 1",
        text: "The Judicial power of this State, both as to matters of law and equity, shall be vested in a Supreme Court, Courts of Chancery, Circuit Courts and Justices of the Peace, provided the General Assembly may also vest such criminal jurisdiction as may be deemed necessary in Corporation Courts, but such jurisdiction shall not extend to capital offenses.",
        amendments: [],
      },
      {
        id: "a5s11", number: "Section 11",
        text: "Justices of the Supreme Court, Chancellors, and Judges of the Circuit Courts, shall be elected by the concurrent vote of a majority of both Houses of the General Assembly.",
        amendments: [
          {
            year: 1850,
            label: "Fifth General Assembly, 1850 — Art. V, §11",
            status: "Proposed",
            passedDate: "Passed Senate Dec. 13, 1850; House Dec. 23, 1850 — subject to Sixth General Assembly",
            amendedText: `[Popular election of Judges — proposed text as passed by Fifth General Assembly, subject to ratification]`,
            change: "Proposes changing election of all Justices and Judges from legislative vote (both Houses concurrently) to popular election by qualified electors. Must be ratified by Sixth General Assembly.",
          },
          {
            year: 1852,
            label: "Sixth General Assembly, 1852 — Art. V, §11",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 20, 1852; House Jan. 1, 1853 — ADOPTED",
            amendedText: `That on the first Monday in October, in the year one thousand eight hundred and fifty-three, and on the first Monday in October, every six years thereafter, there shall be elected by the qualified electors of each of the respective Judicial Circuits of this State, one Judge of the Circuit Court, who shall reside in the Circuit for which he may be elected, and continue in office for the term of six years from and after the first day of January next succeeding his election, unless sooner removed under the provisions made in this Constitution for the removal of Judges by address or impeachment.`,
            change: "Judges of Circuit Courts to be elected by qualified electors of each Judicial Circuit, every six years. First election: October 1853. Replaces legislative election with popular election.",
          },
        ],
      },
      {
        id: "a5s12", number: "Section 12",
        text: "The Judges of the Circuit Courts, shall, at the first session of the General Assembly to be holden under this Constitution, be elected for the term of five years, and shall hold their offices for that term, unless sooner removed under the provisions made in this Constitution for removal of Judges by address or impeachment; and at the expiration of five years, the Justices of the Supreme Court and the Judges of the Circuit Courts, shall be elected for the term of and during their good behavior.",
        amendments: [
          {
            year: 1848,
            label: "Fourth General Assembly, 1848 — Art. V, §12",
            status: "Adopted",
            passedDate: "Passed House Dec. 8, 1848; Senate Dec. 12, 1848 — ADOPTED",
            amendedText: `That at the expiration of the present term of office of the Judges of the Circuit Courts, with the exception hereinafter mentioned, the Justices of the Supreme Court, and the Judges of the Circuit Courts, shall be elected for a term of eight years, and shall hold their offices for that term, unless sooner removed under the provisions made in this Constitution, for the removal of Judges by address or impeachment; and for wilful neglect of duty, or other reasonable cause, which shall not be sufficient ground for impeachment, the Governor shall remove any of them, on the address of two-thirds of the General Assembly. [...] That the Judges first appointed under this amended Constitution, shall be divided by lot into four classes. The first class shall hold his or their office or offices for the term of two years, the second for the term of four years, the third for the term of six years, the fourth for the term of eight years.`,
            change: "Removes 'during good behavior' tenure. Establishes fixed 8-year terms for Justices and Circuit Judges. Judges divided by lot into four staggered classes (2, 4, 6, and 8 year initial terms). Proposed by Third General Assembly (1847), adopted by Fourth (1848).",
          },
          {
            year: 1852,
            label: "Sixth General Assembly, 1852 — Art. V, §12",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 20, 1852; House Jan. 1, 1853 — ADOPTED",
            amendedText: `[See Art. V §11 amendment — the 1848 eight-year staggered class system (§2 of the 1848 act) is hereby abolished. Circuit Judges to be elected by popular vote to 6-year terms under the §11 amendment above.]`,
            change: "The staggered class system established in 1848 (§2) is abolished. Going forward, Circuit Judges are elected by popular vote to 6-year terms as provided in the §11 amendment adopted by this same assembly.",
          },
        ],
      },
      {
        id: "a5s16", number: "Section 16",
        text: "There shall be an Attorney General for the State, who shall reside at the Seat of Government. He shall be elected by joint vote of the two Houses of the General Assembly, and shall hold his office for four years.",
        amendments: [
          {
            year: 1852,
            label: "Sixth General Assembly, 1852 — Art. V, §16",
            status: "Adopted",
            passedDate: "Passed House Jan. 3, 1853; Senate Jan. 6, 1853 — ADOPTED",
            amendedText: `There shall be an Attorney General for the State, who shall reside at the seat of Government; it shall be his duty to attend all sessions of the General Assembly, and upon the passage of any act, to draft and submit to the General Assembly, at the same session, all necessary forms of proceedings under such laws, which, when approved, shall be published therewith, and he shall perform such other duties as may be prescribed by law; he shall be elected by the qualified electors of this State, on the first Monday of October in the year 1856, and every four years thereafter, but may be removed by the Governor, on the address of two-thirds of the two Houses of the General Assembly, and shall receive for his services a compensation to be fixed by law.`,
            change: "Attorney General to be elected by qualified electors of the State rather than by joint vote of the General Assembly. First popular election: October 1856, then every four years.",
          },
        ],
      },
      {
        id: "a5s17", number: "Section 17",
        text: "There shall be one Solicitor for each Circuit, who shall reside therein, to be elected by the joint vote of the General Assembly, who shall hold his office for the term of four years.",
        amendments: [
          {
            year: 1852,
            label: "Sixth General Assembly, 1852 — Art. V, §17",
            status: "Adopted",
            passedDate: "Passed Senate Dec. 20, 1852; House Jan. 1, 1853 — ADOPTED",
            amendedText: `There shall be one Solicitor for each Circuit, who shall reside therein, and shall be elected by the qualified voters of such Circuit, on the first Monday in October, in the year one thousand eight hundred and fifty-three, and every four years thereafter, or at such times as the General Assembly may by law prescribe, and shall receive for his services a compensation to be fixed by law.`,
            change: "Solicitors to be elected by qualified voters of each Circuit rather than by joint vote of the General Assembly. First election: October 1853, then every four years.",
          },
        ],
      },
    ],
  },
  {
    id: "art6",
    title: "Article VI — Suffrage & Qualifications",
    sections: [
      {
        id: "a6s1", number: "Section 1",
        text: "Every free white male person of the age of twenty-one years and upwards, and who shall be at the time of offering to vote a citizen of the United States; and who shall have resided, and had his habitation, domicil, home, and place of permanent abode in Florida for two years next preceding the election at which he shall offer to vote; and who shall have at such time, and for six months immediately preceding said time, shall have had his habitation, domicil, home, and place of permanent abode in the County in which he may offer to vote, and who shall be enrolled in the Militia thereof, shall be deemed a qualified elector at all elections under this Constitution, and none others.",
        amendments: [
          {
            year: 1846,
            label: "Second General Assembly, 1846 — Art. VI, §1",
            status: "Proposed",
            passedDate: "Passed Senate Dec. 1, 1846; House Dec. 16, 1846 — subject to Third General Assembly",
            amendedText: `Every free white male person of the age of twenty-one years and upwards, and who shall be, at the time of offering to vote, a citizen of the United States, and who shall have resided and had his habitation, domicil, home, and place of permanent abode in Florida for one year next preceding the election at which he shall offer to vote, and who shall, at such time, and for six months immediately preceding said time, have had his habitation, domicil, home and place of permanent abode, in the county in which he may offer to vote, shall be deemed a qualified voter at all elections under this Constitution, and none others.`,
            change: "Proposes reducing state residency requirement from two years to one year before voting. Also removes the requirement that electors be enrolled in the Militia. Subject to ratification by Third General Assembly.",
          },
          {
            year: 1847,
            label: "Third General Assembly, 1847 — Art. VI, §1",
            status: "Adopted",
            passedDate: "Passed by Third General Assembly, 1847 — ADOPTED, effective 1848",
            amendedText: `Every free white male person of the age of twenty-one years and upwards, and who shall be, at the time of offering to vote, a citizen of the United States, and who shall have resided and had his habitation, domicil, home, and place of permanent abode in Florida for one year next preceding the election at which he shall offer to vote, and who shall, at such time, and for six months immediately preceding said time, have had his habitation, domicil, home and place of permanent abode, in the county in which he may offer to vote, shall be deemed a qualified voter at all elections under this Constitution, and none others.`,
            change: "Adopted: state residency reduced from 2 years to 1 year. Militia enrollment requirement removed. County residency requirement of 6 months retained.",
          },
        ],
      },
      {
        id: "a6s8", number: "Section 8",
        text: "No Governor, Justice of the Supreme Court, Chancellor or Judge of this State, shall be eligible to election, or post of honor, or emolument, under this State, or to the station of Senator, or Representative in Congress of the United States, from this State, until one year after he shall have ceased to be such Governor, Justice, Chancellor, or Judge.",
        amendments: [
          {
            year: 1858,
            label: "Ninth General Assembly, 1858 — Art. VI, §8 (State Officers)",
            status: "Proposed",
            passedDate: "Proposed 1858 — subject to ratification by Tenth General Assembly. Not adopted.",
            amendedText: `[State Officers amendment as proposed by Ninth General Assembly — not adopted by Tenth General Assembly]`,
            change: "Proposed amendment to eligibility restrictions for state officers after leaving office. Not ratified by Tenth General Assembly — this amendment failed.",
          },
        ],
      },
    ],
  },
  {
    id: "art13",
    title: "Article XIII — Banks & Corporations",
    sections: [
      {
        id: "a13s7", number: "Section 7",
        text: "[Original text of Article XIII, Section 7 regarding the liabilities and regulations of banking corporations operating within the State of Florida.]",
        amendments: [
          {
            year: 1858,
            label: "Ninth General Assembly, 1858 — Art. XIII, §7 (Banks)",
            status: "Proposed",
            passedDate: "Proposed 1858 — subject to ratification by Tenth General Assembly",
            amendedText: `[Banks amendment as proposed by Ninth General Assembly — subject to ratification]`,
            change: "Proposes amendment to banking regulations. Must be ratified by Tenth General Assembly.",
          },
          {
            year: 1860,
            label: "Tenth General Assembly, 1860 — Art. XIII, §7",
            status: "Adopted",
            passedDate: "Passed Senate Feb. 4, 1861; House Feb. 7, 1861 — ADOPTED",
            amendedText: `All liabilities of such Banks shall be payable in specie, and the aggregate of the liabilities and issues of a Bank (exclusive of deposits) shall at no time exceed double the amount of its capital stock paid in.`,
            change: "Banking amendment adopted: all bank liabilities must be payable in specie. Total liabilities and issues of any bank (excluding deposits) may not exceed double the paid-in capital stock.",
          },
        ],
      },
    ],
  },
];

// Sidebar summary of each amendment year
const AMENDMENT_EVENTS = [
  {
    year: 1846,
    assembly: "Second General Assembly",
    status: "Proposed",
    items: ["Art. VI, §1 — Suffrage (residency 2yr → 1yr)", "Art. IV, §§2,3,5,6 — Biennial Sessions"],
    note: "Passed both houses but requires ratification by the Third General Assembly before taking effect.",
  },
  {
    year: 1847,
    assembly: "Third General Assembly",
    status: "Adopted",
    items: ["Art. IV, §§2,3,5,6 — Biennial Sessions ✓", "Art. VI, §1 — Suffrage ✓", "Art. V, §12 — Judicial Terms (proposed only)"],
    note: "Biennial sessions and suffrage amendments ratified and adopted effective 1848. Judicial terms proposed but not yet ratified.",
  },
  {
    year: 1848,
    assembly: "Fourth General Assembly",
    status: "Adopted",
    items: ["Art. V, §12 — Judicial Terms (8-year fixed terms) ✓"],
    note: "Judges of Circuit Courts to serve 8-year fixed terms. Removes 'during good behavior' tenure. Proposed by Third Assembly (1847), adopted here.",
  },
  {
    year: 1850,
    assembly: "Fifth General Assembly",
    status: "Proposed",
    items: ["Art. V, §§11,12,17 — Judicial Elections (popular vote)"],
    note: "Popular election of judges proposed. Must be ratified by Sixth General Assembly before taking effect.",
  },
  {
    year: 1852,
    assembly: "Sixth General Assembly",
    status: "Adopted",
    items: ["Art. V, §§11,12,17 — Judicial Elections (popular vote) ✓", "Art. III, §§14,23 — State Officers (popular vote) ✓", "Art. V, §16 — Attorney General (popular vote) ✓"],
    note: "Major democratic reform: popular election adopted for all judges, state officers, attorney general, and solicitors. First elections set for 1853 and 1856.",
  },
  {
    year: 1858,
    assembly: "Ninth General Assembly",
    status: "Proposed",
    items: ["Art. VI, §8 — State Officers eligibility", "Art. XIII, §7 — Banking regulations", "Art. IV — Annual Sessions (restore)"],
    note: "All three proposed. Require ratification by Tenth General Assembly. State Officers amendment ultimately failed; Banks and Annual Sessions were adopted in 1860.",
  },
  {
    year: 1860,
    assembly: "Tenth General Assembly",
    status: "Adopted",
    items: ["Art. XIII, §7 — Banks (specie payments) ✓", "Art. IV — Annual Sessions restored ✓"],
    note: "Banking amendment and restoration of annual sessions both adopted. 1847 biennial sessions act expressly abrogated. Sessions now limited to 30 days unless majority votes to extend.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const STATUS = {
  Adopted:  { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
  Proposed: { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  Defeated: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
};

export default function App() {
  const [viewYear, setViewYear]         = useState(1838);
  const [activeArticle, setActiveArticle] = useState("art1");
  const [search, setSearch]             = useState("");
  const [expanded, setExpanded]         = useState({});

  const article = ARTICLES.find(a => a.id === activeArticle);
  const visibleAmends = (sec) => sec.amendments.filter(a => a.year <= viewYear);
  const match = (t) => !search || t.toLowerCase().includes(search.toLowerCase());
  const eventsToDate = AMENDMENT_EVENTS.filter(e => e.year <= viewYear);
  const toggle = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F8F6F1", minHeight: "100vh", width: "100%", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%;min-height:100vh;background:#F8F6F1}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#F8F6F1}::-webkit-scrollbar-thumb{background:#C9C0AE;border-radius:3px}
        .nbtn{background:none;border:none;cursor:pointer;font-family:'Source Sans 3',sans-serif;font-size:.87rem;color:rgba(255,255,255,.85);font-weight:600;padding:4px 0;transition:color .15s}
        .nbtn:hover{color:#C4882A}
        .tbtn{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:7px 10px;font-family:'Source Sans 3',sans-serif;font-size:.79rem;color:#374151;border-radius:4px;transition:background .12s;display:flex;justify-content:space-between;align-items:center}
        .tbtn:hover{background:#EEE9DF}
        .tbtn.on{background:#1B3A6B;color:white}
        .card{background:white;border:1px solid #E5DDD0;border-radius:6px;padding:20px 22px;margin-bottom:14px}
        .card.am{border-left:3px solid #C4882A}
        .abox{background:#FFFBF5;border:1px solid #F0D8AA;border-radius:5px;padding:12px 14px;margin-top:12px}
        .badge{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:20px;font-family:'Source Sans 3',sans-serif;font-size:.67rem;font-weight:700;flex-shrink:0}
        .sinput{width:100%;padding:7px 10px;border:1px solid #C9C0AE;border-radius:4px;font-family:'Source Sans 3',sans-serif;font-size:.82rem;background:white;outline:none}
        .sinput:focus{border-color:#1B3A6B}
        .sinput::placeholder{color:#bbb}
        .ydot{width:12px;height:12px;border-radius:50%;cursor:pointer;border:2px solid white;transition:transform .15s;flex-shrink:0}
        .ydot:hover{transform:scale(1.4)}
        .dbtn{display:flex;align-items:center;gap:5px;padding:6px 12px;border:1px solid #C9C0AE;border-radius:4px;background:white;font-family:'Source Sans 3',sans-serif;font-size:.77rem;color:#374151;cursor:pointer;transition:all .12s}
        .dbtn:hover{background:#1B3A6B;color:white;border-color:#1B3A6B}
        .ubtn{padding:7px 16px;background:#1B3A6B;color:white;border:none;border-radius:4px;font-family:'Source Sans 3',sans-serif;font-size:.83rem;font-weight:600;cursor:pointer}
        .ubtn:hover{background:#0f2a52}
        .xbtn{background:none;border:none;cursor:pointer;text-align:left;width:100%;padding:0;font-family:'Source Sans 3',sans-serif}
      `}</style>

      {/* ── NAV ── */}
      <header style={{ background: "#1B3A6B", borderBottom: "3px solid #C4882A", padding: "0 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ fontSize: "1.4rem" }}>⚖</span>
            <div>
              <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "1.05rem", fontWeight: 700, color: "white" }}>Florida Constitution</div>
              <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.58rem", color: "rgba(255,255,255,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>Historical Archive </div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["Home", "The Constitutions", "Research Guides", "About"].map(n => (
              <button key={n} className="nbtn" style={{ color: n === "The Constitutions" ? "#C4882A" : undefined, borderBottom: n === "The Constitutions" ? "2px solid #C4882A" : "2px solid transparent", paddingBottom: 2 }}>{n}</button>
            ))}
            <button style={{ background: "#C4882A", color: "white", border: "none", padding: "6px 16px", borderRadius: 4, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, fontSize: ".84rem", cursor: "pointer" }}>Search</button>
          </nav>
        </div>
      </header>

      {/* ── TIMELINE: 1838–1860 only ── */}
      <div style={{ background: "white", borderBottom: "1px solid #E5DDD0", padding: "14px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontFamily: "'Source Sans 3',sans-serif", color: "#9CA3AF", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>
            Constitution of 1838 — Amendment Timeline
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 6, right: 6, height: 2, background: "#D1D5DB", top: "50%", transform: "translateY(-50%)", zIndex: 0 }} />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
              {TIMELINE_YEARS.map(yr => {
                const evt = AMENDMENT_EVENTS.find(e => e.year === yr);
                const isBase = yr === 1838;
                const isActive = yr === viewYear;
                const isPast = yr < viewYear;
                const isAdopted = evt?.status === "Adopted";
                const dotColor = isBase ? "#1B3A6B" : isAdopted ? "#10B981" : "#F59E0B";
                return (
                  <div key={yr} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }} onClick={() => setViewYear(yr)}>
                    <div className="ydot" style={{
                      background: isActive ? "white" : (isPast || isBase) ? dotColor : "#D1D5DB",
                      boxShadow: isActive ? `0 0 0 3px ${dotColor}` : isPast ? `0 0 0 2px ${dotColor}` : "none",
                      transform: isActive ? "scale(1.4)" : "scale(1)",
                    }} />
                    <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".72rem", fontWeight: isActive ? 700 : 400, color: isActive ? "#1B3A6B" : "#6B7280", whiteSpace: "nowrap" }}>{yr}</span>
                    {evt && <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".58rem", color: isAdopted ? "#10B981" : "#F59E0B", fontWeight: 600, textTransform: "uppercase" }}>{evt.status}</span>}
                    {isBase && <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".58rem", color: "#1B3A6B", fontWeight: 600, textTransform: "uppercase" }}>Original</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── DATE BAR ── */}
      <div style={{ background: "#F0EBE1", borderBottom: "1px solid #E5DDD0", padding: "9px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".86rem", color: "#374151" }}>Viewing as of:</span>
            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "1rem", fontWeight: 700, color: "#1B3A6B" }}>January 1, {viewYear}</span>
          </div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <select style={{ padding: "5px 8px", border: "1px solid #C9C0AE", borderRadius: 4, fontFamily: "'Source Sans 3',sans-serif", fontSize: ".78rem", background: "white" }}>
              {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => <option key={m}>{m}</option>)}
            </select>
            <select style={{ padding: "5px 8px", border: "1px solid #C9C0AE", borderRadius: 4, fontFamily: "'Source Sans 3',sans-serif", fontSize: ".78rem", background: "white" }}>
              {Array.from({length:31},(_,i)=>i+1).map(d=><option key={d}>{d}</option>)}
            </select>
            <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))} style={{ padding: "5px 8px", border: "1px solid #C9C0AE", borderRadius: 4, fontFamily: "'Source Sans 3',sans-serif", fontSize: ".78rem", background: "white" }}>
              {Array.from({length: 1860 - 1838 + 1}, (_, i) => 1838 + i).map(y => <option key={y}>{y}</option>)}
            </select>
            <button className="ubtn">Update</button>
            <button className="dbtn">⬇ PDF</button>
            <button className="dbtn">🖨 Print</button>
          </div>
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div style={{ background: "#1B3A6B", padding: "6px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".78rem", color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
            Now Displaying: Constitution of 1838 — Amended through {viewYear}
          </span>
          <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", color: "rgba(255,255,255,.45)" }}>
            Source: FSU College of Law Library · library.law.fsu.edu
          </span>
        </div>
      </div>

      {/* ── THREE PANELS ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 36px", display: "grid", gridTemplateColumns: "220px 1fr 265px", gap: 20, alignItems: "start" }}>

        {/* LEFT */}
        <aside style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 6, padding: "15px 11px", position: "sticky", top: 16 }}>
          <h3 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: ".88rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 11, paddingBottom: 9, borderBottom: "1px solid #E5DDD0" }}>Table of Contents</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {ARTICLES.map(a => (
              <button key={a.id} className={`tbtn ${activeArticle === a.id ? "on" : ""}`} onClick={() => setActiveArticle(a.id)}>
                <span>{a.title}</span>
                <span style={{ opacity: .45, fontSize: ".73rem" }}>›</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 13, borderTop: "1px solid #E5DDD0" }}>
            <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Search Document</p>
            <div style={{ display: "flex", gap: 5 }}>
              <input className="sinput" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
              <button style={{ background: "#1B3A6B", color: "white", border: "none", borderRadius: 4, padding: "0 8px", cursor: "pointer", fontSize: ".88rem" }}>⌕</button>
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <main>
          <div style={{ background: "linear-gradient(to bottom,#F0EBE1,#E8E0D2)", border: "1px solid #C9C0AE", borderRadius: 6, padding: "18px 20px", textAlign: "center", marginBottom: 16 }}>
            <h1 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "1.18rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 4 }}>
              Constitution, or Form of Government, for the People of Florida
            </h1>
            <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".72rem", color: "#6B7280", letterSpacing: ".1em", textTransform: "uppercase" }}>ADOPTED 1838</p>
          </div>

          {article && (
            <>
              <h2 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "1.12rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 14 }}>{article.title}</h2>
              {article.sections.filter(s => match(s.text) || match(s.number || "")).map(sec => {
                const amends = visibleAmends(sec);
                const hasAm = amends.length > 0;
                return (
                  <div key={sec.id} className={`card ${hasAm ? "am" : ""}`}>
                    {sec.number && <h3 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: ".92rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 9 }}>{sec.number}</h3>}
                    <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: ".9rem", lineHeight: 1.88, color: "#1a1a2e" }}>
                      {hasAm && <span style={{ color: "#C4882A", marginRight: 5 }}>●</span>}
                      {sec.text}
                    </p>
                    {amends.map((am, i) => {
                      const st = STATUS[am.status] || STATUS.Proposed;
                      const key = `${sec.id}-${i}`;
                      const open = expanded[key];
                      return (
                        <div key={i} className="abox">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                            <button className="xbtn" onClick={() => toggle(key)} style={{ flex: 1 }}>
                              <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#92400E" }}>{am.label}</span>
                              <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", color: "#9CA3AF", marginLeft: 8 }}>{open ? "▲ collapse" : "▼ full text"}</span>
                            </button>
                            <span className="badge" style={{ background: st.bg, color: st.color, marginLeft: 8 }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                              {am.status}
                            </span>
                          </div>
                          <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".81rem", color: "#374151", lineHeight: 1.65, marginBottom: 6 }}>{am.change}</p>
                          {open && (
                            <div style={{ background: "#FFF8F0", border: "1px solid #F0D8AA", borderRadius: 4, padding: "10px 12px", marginTop: 8 }}>
                              <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 5 }}>Amended Text (verbatim)</p>
                              <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: ".82rem", lineHeight: 1.8, color: "#1a1a2e", fontStyle: "italic" }}>{am.amendedText}</p>
                            </div>
                          )}
                          <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".69rem", color: "#9CA3AF", marginTop: 6 }}>{am.passedDate}</p>
                        </div>
                      );
                    })}
                    {hasAm && <p style={{ fontFamily: "'Libre Baskerville',serif", fontStyle: "italic", fontSize: ".76rem", color: "#9CA3AF", marginTop: 10, textAlign: "center" }}>— As Amended Through {viewYear}</p>}
                  </div>
                );
              })}
            </>
          )}
        </main>

        {/* RIGHT */}
        <aside style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 6, padding: "15px 14px", position: "sticky", top: 16, maxHeight: "80vh", overflowY: "auto" }}>
          <h3 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: ".88rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 11, paddingBottom: 9, borderBottom: "1px solid #E5DDD0" }}>
            Amendment History (Through {viewYear})
          </h3>

          {eventsToDate.length === 0 && (
            <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".8rem", color: "#9CA3AF", textAlign: "center", padding: "14px 0" }}>
              No amendments before {viewYear}.<br />The original 1838 text is in effect.
            </p>
          )}

          {eventsToDate.map((ev, i) => {
            const isLast = i === eventsToDate.length - 1;
            const open = expanded[`ev-${ev.year}`];
            const st = STATUS[ev.status] || STATUS.Proposed;
            return (
              <div key={ev.year} style={{ position: "relative", paddingLeft: 17, paddingBottom: 13 }}>
                {!isLast && <div style={{ position: "absolute", left: 4, top: 11, bottom: 0, width: 2, background: "#E5DDD0" }} />}
                <div style={{ position: "absolute", left: 0, top: 3, width: 10, height: 10, borderRadius: "50%", background: st.dot, border: "2px solid white", boxShadow: `0 0 0 1px ${st.dot}` }} />
                <button className="xbtn" onClick={() => toggle(`ev-${ev.year}`)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#1B3A6B" }}>{ev.assembly}</span>
                      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".68rem", color: "#9CA3AF", marginTop: 1 }}>{ev.year}</div>
                    </div>
                    <span className="badge" style={{ background: st.bg, color: st.color, marginLeft: 6 }}>{ev.status}</span>
                  </div>
                </button>
                {open && (
                  <div style={{ marginTop: 7 }}>
                    {ev.items.map((it, j) => (
                      <div key={j} style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", color: "#374151", marginBottom: 4, paddingLeft: 6, borderLeft: "2px solid #E5DDD0" }}>{it}</div>
                    ))}
                    <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".68rem", color: "#6B7280", marginTop: 5, fontStyle: "italic", lineHeight: 1.55 }}>{ev.note}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 14, paddingTop: 11, borderTop: "1px solid #E5DDD0" }}>
            <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".66rem", color: "#C9C0AE", lineHeight: 1.6 }}>
              Source: FSU College of Law Library<br />
              <em>Florida's Constitutions: The Documentary History</em><br />
              library.law.fsu.edu
            </p>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E5DDD0", padding: "16px 36px", background: "white", marginTop: 20 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", color: "#9CA3AF" }}>© 2025 Florida Constitution Project · University of Florida</span>
          <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".7rem", color: "#9CA3AF" }}>Privacy Policy · Terms of Use · Site Map</span>
        </div>
      </footer>
    </div>
  );
}