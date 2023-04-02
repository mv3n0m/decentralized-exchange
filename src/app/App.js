import { useDispatch } from "react-redux";
import { handleProvider, handleNetwork, handleContract, handleAccount } from "store/handlers"
import { Navbar, Markets } from "components"
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch()
  const tokens = [ "DXT", "mETH", "mDAI" ]

  const loadBlockChainData = async () => {
    const provider = handleProvider(dispatch)
    const chainId = await handleNetwork(provider, dispatch)

    window.ethereum.on('chainChanged', () => window.location.reload())

    window.ethereum.on('accountsChanged', async () => {
      await handleAccount(provider, dispatch)
    })

    const exchange = await handleContract(chainId, "exchange", provider, dispatch)

    tokens.forEach(async token => {
      await handleContract(chainId, token, provider, dispatch)
    })
  }

  useEffect(() => {
    loadBlockChainData()
  }, [])


  return (
    <div>
      <Navbar />
      <main className='exchange grid'>
        <section className='exchange__section--left grid'>
          <Markets />
        </section>
        <section className='exchange__section--right grid'>

        </section>
      </main>
    </div>
  );
}

export default App;