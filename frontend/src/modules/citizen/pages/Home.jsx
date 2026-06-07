import React from "react";
import Hero from "../components/HomeComponent/Hero";
import HowItWork from "../components/HomeComponent/HowItWork";
import Features from "../components/HomeComponent/Features";
import { Category } from "../components/HomeComponent/Category";
import { CTA } from "../components/HomeComponent/CTA";
import { Testimonial } from "../components/HomeComponent/Testimonial";
import { useRegisterComplaintContext } from "@/context/RegisterComplaintContext";

export const Home = () => {
  const { isLoading, setIsLoading } = useRegisterComplaintContext();
  return (
    <>
      {isLoading && (
        <FullScreenLoader
          show={isLoading}
          title={"Image is verifying by AI..."}
        />
      )}
      <Hero />
      <HowItWork />
      <Features />
      <Category />
      <CTA />
      <Testimonial />
    </>
  );
};
