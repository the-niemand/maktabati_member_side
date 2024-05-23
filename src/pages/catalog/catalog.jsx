import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import Popular from './Popular'
import BestSeller from './BestSeller'
import NewReleases from './NewReleases'
import UpComming from './UpComming'

const Catalog = () => {



  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 8, display: "flex", flexDirection: "column", justifyContent: "center", gap: "7rem" }}
    >
      <Popular />
      <BestSeller />
      <NewReleases />
      <UpComming />
    </Container>
  )
}

export default Catalog