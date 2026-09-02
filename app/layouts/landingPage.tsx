import React from 'react'
import HeroSec from "./(section)/HeroSec"
import SponsorStrip from "./(section)/SponsorStrip"
import StatsSec from "./(section)/StatsSec"
import TentangSec from './(section)/TentangSec'
import ProblemSec from './(section)/ProblemSec'
import HowWorksSec from './(section)/HowWorksSec'
import CategorySec from './(section)/CategorySec'
import BinaScoreSec from './(section)/BinaScoreSec'
import PetaSec from './(section)/PetaSec'
import ReviewSec from './(section)/ReviewSec'
import ReportSec from './(section)/ReportSec'
import CTASec from './(section)/CTASec'
import FooterSec from './(section)/FooterSec'

function LandingPage() {
  return (
    <div className='w-full h-max overflow-x-hidden'>
      <HeroSec />
      <SponsorStrip />
      <StatsSec />
      <TentangSec />
      <ProblemSec />
      <HowWorksSec />
      <CategorySec />
      <BinaScoreSec />
      <PetaSec />
      <ReviewSec />
      <ReportSec />
      <CTASec />
      <FooterSec />
    </div>
  )
}

export default LandingPage