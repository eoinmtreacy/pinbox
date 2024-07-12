import React from 'react';
import Header from './LandingHeader';
import First from './LandingFirst';
import Target from './LandingTarget';
import Preview from './LandingPreview';
import CoreFeatures from './LandingCoreFeatures';
import FeatureRealTime from './LandingFeatureRealTime';
import SocialFeature from './LandingSocialFeature';
import UserInsights from './LandingUserInsights';
import BusinessInsights from './BusinessInsights';
import LandingMeetTeam from './LandingMeetTeam';
import Vision from './LandingVision';
import UserFeedback from './LandingFeedback';
import Footer from './LandingFooter';
const LandingMain = () => {
    return (
        <div className="bg-white h-screen overflow-hidden">
            <div className="h-screen overflow-y-scroll snap-y snap-mandatory pt-3 w-full overflow-x-hidden">
                <div className="mb-5 w-full">
                    <Header />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <First />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Preview />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Target />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <CoreFeatures />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <FeatureRealTime />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <SocialFeature />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <UserInsights />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <BusinessInsights />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <Vision />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <LandingMeetTeam />
                </div>
                <div className="snap-start h-screen w-full flex justify-center items-center">
                    <UserFeedback />
                </div>
                <div className="mb-5 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default LandingMain;
