import { useQuery } from '@tanstack/react-query'
import { getFilesService } from '@/api'

export const useGetFile = ({ categoryId }: File.GetFileParams) => {
  const { data } = useQuery({
    queryKey: ['getFile'],
    queryFn: async () => getFilesService({ categoryId }),
  })

  return {
    data,
  }
}
