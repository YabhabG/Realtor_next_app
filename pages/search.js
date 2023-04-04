import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {Flex, Box, Text, Icon} from '@chakra-ui/react';
import {BsFilter} from 'react-icons/bs';


import SearchFilters from "@/components/SearchFilters";
import Property from "@/components/Property";
import noresult from '../assets/Images/noresult.svg'
import { fetchApi, baseUrl} from "@/utils/fetchApi";


const Search=({properties})=>{
    const [searchFilters, setSearchFilters] = useState(false);
    const router=useRouter();

    return (
        <Box>
            <Flex
            cursor={'pointer'}
            bg='gray.200'
            borderBottom={'1px'}
            borderColor='gray.200'
            p='2'
            fontWeight={'black'}
            fontSize='lg'
            justifyContent={'center'}
            alignItems='center'
            onClick={()=> setSearchFilters((prevFilters)=> !prevFilters)}
            >
                <Text>Search Property by filters</Text>
                <Icon paddingLeft={'2'} w='7' as={BsFilter}/>
            </Flex>
            {SearchFilters && <SearchFilters/>}

            <Text fontSize={'2x1'} p='4' fontWeight={'bold'}>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap={'wrap'}>
                
                {properties.map((property)=> {<Property property={property} key={property.id}/>})}
            </Flex>
            <Flex flexWrap={'wrap'}>
            {properties.map((property)=> {return <Property property={property} key={property.id}/> })}
            </Flex>

            {properties.length===0 && (
                <Flex justifyContent={'center'} alignItems='center' flexDirection={'column'} marginTop='5'>
                    <Image alt="no result" src={noresult}/>
                    <Text fontSize={'2x1'} marginTop='3' fontWeight={'bold'}>No Results Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export default Search;

export async function getServerSideProps({query}){

    const purpose= query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice=query.minPrice || '0';
    const maxPrice=query.maxPrice || '1000000';
    const roomsMin=query.roomsMin || '0';
    const bathsMin=query.bathsMin || '0';
    const sort=query.sort || 'price-desc';
    const areaMax=query.areaMax ||'35000';
    const locationExternalIDs=query.locationExternalIDs || '5002';
    const categoryExternalID=query.categoryExternalID || '4';

    const properties=await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&roomsMin=${roomsMin}&areaMax=${areaMax}`)

  
  
    return {
      props: {
        properties: properties?.hits
      }
    }
}



