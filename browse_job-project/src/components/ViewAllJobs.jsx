import React from 'react'
import { Link } from 'react-router-dom'
import { BlurFade } from './ui/blur-fade'

const ViewAllJobs = () => {
  return (
    <>
      <section className="m-auto max-w-lg my-10 px-6">
        <BlurFade delay={0.6} inView>
          <Link
          to="jobs"
          className="block bg-black text-white text-center py-4 px-6 rounded-md hover:bg-gray-700 buttonEffect"
        >
          View All Jobs
        </Link>
        </BlurFade>
        
      </section>
    </>
  )
}

export default ViewAllJobs